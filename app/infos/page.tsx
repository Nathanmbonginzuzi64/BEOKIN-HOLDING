import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InfosSection } from "@/components/infos-section";

export const metadata: Metadata = {
  title: "Infos — BEOKIN HOLDING SARL",
  description: "Publications et annonces de BEOKIN HOLDING SARL.",
};

export default function InfosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <InfosSection fullPage />
      <Footer />
    </main>
  );
}
