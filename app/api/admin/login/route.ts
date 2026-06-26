import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json(
      { error: "ADMIN_SECRET non configuré sur le serveur." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { password?: string };

    if (!body.password || body.password !== adminSecret) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
    }

    return NextResponse.json({ token: adminSecret });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
