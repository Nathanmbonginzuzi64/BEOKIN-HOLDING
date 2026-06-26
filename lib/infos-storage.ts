export const INFOS_STORAGE_KEY = "beokin-published-infos";

export type InfoPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  location: string;
  eventDate: string;
  image?: string;
  publishedAt: string;
};

export type PublishInfoInput = {
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  location: string;
  eventDate: string;
  image?: string;
};

export function loadInfos(): InfoPost[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(INFOS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as Partial<InfoPost>[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((info) => ({
        id: info.id ?? crypto.randomUUID(),
        title: info.title ?? "",
        summary: info.summary ?? "",
        content: info.content ?? "",
        category: info.category ?? "",
        author: info.author ?? "",
        location: info.location ?? "",
        eventDate: info.eventDate ?? "",
        image: info.image,
        publishedAt: info.publishedAt ?? new Date().toISOString(),
      }))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch {
    return [];
  }
}

export function saveInfos(infos: InfoPost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INFOS_STORAGE_KEY, JSON.stringify(infos));
}

export function publishInfo(input: PublishInfoInput): InfoPost {
  const post: InfoPost = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content.trim(),
    category: input.category.trim(),
    author: input.author.trim(),
    location: input.location.trim(),
    eventDate: input.eventDate,
    image: input.image,
    publishedAt: new Date().toISOString(),
  };

  const infos = [post, ...loadInfos()];
  saveInfos(infos);
  return post;
}

export function removeInfo(id: string) {
  const infos = loadInfos().filter((info) => info.id !== id);
  saveInfos(infos);
}

export function updateInfo(id: string, input: PublishInfoInput): InfoPost | null {
  const infos = loadInfos();
  const index = infos.findIndex((info) => info.id === id);

  if (index === -1) return null;

  const updated: InfoPost = {
    ...infos[index],
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content.trim(),
    category: input.category.trim(),
    author: input.author.trim(),
    location: input.location.trim(),
    eventDate: input.eventDate,
    image: input.image,
  };

  infos[index] = updated;
  saveInfos(infos);
  return updated;
}
