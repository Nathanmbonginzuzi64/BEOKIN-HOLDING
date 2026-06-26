import fs from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import type { InfoPost, PublishInfoInput } from "@/lib/infos-types";
import { normalizeInfoPost, sortInfos } from "@/lib/infos-types";

const BLOB_PATHNAME = "beokin-published-infos.json";
const LOCAL_DATA_FILE = path.join(process.cwd(), "data", "published-infos.json");
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "infos");

function useBlobStorage() {
  if (process.env.INFOS_STORAGE === "local") return false;
  if (process.env.INFOS_STORAGE === "blob") {
    return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  }
  // En local : fichiers sur disque. Sur Vercel : Blob si le token est configuré.
  if (process.env.VERCEL) {
    return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  }
  return false;
}

async function ensureLocalDataFile() {
  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  try {
    await fs.access(LOCAL_DATA_FILE);
  } catch {
    await fs.writeFile(LOCAL_DATA_FILE, "[]", "utf-8");
  }
}

async function readLocalInfos(): Promise<InfoPost[]> {
  await ensureLocalDataFile();
  const raw = await fs.readFile(LOCAL_DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw) as Partial<InfoPost>[];
  if (!Array.isArray(parsed)) return [];
  return sortInfos(parsed.map(normalizeInfoPost));
}

async function writeLocalInfos(infos: InfoPost[]) {
  await ensureLocalDataFile();
  await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(sortInfos(infos), null, 2), "utf-8");
}

async function readBlobInfos(): Promise<InfoPost[]> {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
  const blob = blobs.find((item) => item.pathname === BLOB_PATHNAME);

  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];

  const parsed = (await response.json()) as Partial<InfoPost>[];
  if (!Array.isArray(parsed)) return [];

  return sortInfos(parsed.map(normalizeInfoPost));
}

async function writeBlobInfos(infos: InfoPost[]) {
  await put(BLOB_PATHNAME, JSON.stringify(sortInfos(infos), null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getPublishedInfos(): Promise<InfoPost[]> {
  if (useBlobStorage()) {
    return readBlobInfos();
  }
  return readLocalInfos();
}

async function savePublishedInfos(infos: InfoPost[]) {
  if (useBlobStorage()) {
    await writeBlobInfos(infos);
    return;
  }
  await writeLocalInfos(infos);
}

async function persistImage(image?: string): Promise<string | undefined> {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  if (!image.startsWith("data:")) return image;

  const [, base64 = ""] = image.split(",");
  const buffer = Buffer.from(base64, "base64");
  const extension = image.includes("image/png") ? "png" : "jpg";
  const filename = `${crypto.randomUUID()}.${extension}`;

  if (useBlobStorage()) {
    const blob = await put(`infos/images/${filename}`, buffer, {
      access: "public",
      contentType: image.slice(5, image.indexOf(";")),
    });
    return blob.url;
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const filePath = path.join(LOCAL_UPLOAD_DIR, filename);
  await fs.writeFile(filePath, buffer);
  return `/uploads/infos/${filename}`;
}

function buildPost(input: PublishInfoInput, image?: string): InfoPost {
  return normalizeInfoPost({
    id: crypto.randomUUID(),
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content.trim(),
    category: input.category.trim(),
    author: input.author.trim(),
    location: input.location.trim(),
    eventDate: input.eventDate,
    image,
    publishedAt: new Date().toISOString(),
  });
}

export async function createPublishedInfo(input: PublishInfoInput): Promise<InfoPost> {
  const image = await persistImage(input.image);
  const post = buildPost(input, image);
  const infos = await getPublishedInfos();
  await savePublishedInfos([post, ...infos]);
  return post;
}

export async function updatePublishedInfo(
  id: string,
  input: PublishInfoInput
): Promise<InfoPost | null> {
  const infos = await getPublishedInfos();
  const index = infos.findIndex((info) => info.id === id);
  if (index === -1) return null;

  const image = await persistImage(input.image ?? infos[index].image);
  const updated: InfoPost = {
    ...infos[index],
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content.trim(),
    category: input.category.trim(),
    author: input.author.trim(),
    location: input.location.trim(),
    eventDate: input.eventDate,
    image,
  };

  infos[index] = updated;
  await savePublishedInfos(infos);
  return updated;
}

export async function deletePublishedInfo(id: string): Promise<boolean> {
  const infos = await getPublishedInfos();
  const next = infos.filter((info) => info.id !== id);
  if (next.length === infos.length) return false;
  await savePublishedInfos(next);
  return true;
}

export async function getPublishedInfoById(id: string): Promise<InfoPost | undefined> {
  const infos = await getPublishedInfos();
  return infos.find((info) => info.id === id);
}

export function getInfosStorageMode() {
  return useBlobStorage() ? "vercel-blob" : "local-file";
}
