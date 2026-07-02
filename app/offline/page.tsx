import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hors ligne — BEOKIN HOLDING",
  description: "Vous êtes hors ligne. Reconnectez-vous pour accéder au site.",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <Image
        src="/logo.png"
        alt="BEOKIN HOLDING SARL"
        width={200}
        height={56}
        className="h-12 w-auto"
        priority
      />

      <h1 className="mt-8 text-2xl font-bold text-foreground">Vous êtes hors ligne</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        La connexion internet est indisponible. Les pages déjà visitées peuvent rester
        accessibles. Reconnectez-vous pour retrouver toutes les fonctionnalités.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-beokin-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-beokin-blue/90"
      >
        Réessayer
      </Link>
    </main>
  );
}
