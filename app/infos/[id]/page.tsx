import type { Metadata } from "next";
import dynamic from "next/dynamic";

const InfoDetailContent = dynamic(
  () =>
    import("@/components/info-detail-content").then((module) => module.InfoDetailContent),
  {
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Détail — Infos BEOKIN HOLDING SARL",
  description: "Publication complète de BEOKIN HOLDING SARL.",
};

export default function InfoDetailPage() {
  return (
    <main className="min-h-screen">
      <InfoDetailContent />
    </main>
  );
}
