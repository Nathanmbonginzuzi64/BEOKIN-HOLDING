import { NextResponse } from "next/server";

export function verifyAdminRequest(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json(
      { error: "ADMIN_SECRET non configuré sur le serveur." },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || token !== adminSecret) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  return null;
}
