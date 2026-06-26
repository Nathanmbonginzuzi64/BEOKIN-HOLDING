import { NextResponse } from "next/server";
import { deletePublishedInfo, getPublishedInfoById, updatePublishedInfo } from "@/lib/infos-server";
import type { PublishInfoInput } from "@/lib/infos-types";
import { verifyAdminRequest } from "@/lib/admin-auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const info = await getPublishedInfoById(id);

    if (!info) {
      return NextResponse.json({ error: "Publication introuvable." }, { status: 404 });
    }

    return NextResponse.json(info);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement." }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const unauthorized = verifyAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = (await request.json()) as PublishInfoInput;

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont obligatoires." },
        { status: 400 }
      );
    }

    const updated = await updatePublishedInfo(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Publication introuvable." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la modification." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const unauthorized = verifyAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const deleted = await deletePublishedInfo(id);

    if (!deleted) {
      return NextResponse.json({ error: "Publication introuvable." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }
}
