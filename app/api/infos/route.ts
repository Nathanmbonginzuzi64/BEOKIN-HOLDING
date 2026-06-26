import { NextResponse } from "next/server";
import { getPublishedInfos, createPublishedInfo } from "@/lib/infos-server";
import type { PublishInfoInput } from "@/lib/infos-types";
import { verifyAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  try {
    const infos = await getPublishedInfos();
    return NextResponse.json(infos);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = verifyAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as PublishInfoInput;

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont obligatoires." },
        { status: 400 }
      );
    }

    const post = await createPublishedInfo(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la publication." }, { status: 500 });
  }
}
