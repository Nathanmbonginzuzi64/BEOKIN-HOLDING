import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Partners } from "@/components/partners";
import { OtherPartners } from "@/components/other-partners";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Partenaires — BEOKIN HOLDING SARL",
  description: "Découvrez les partenaires de BEOKIN HOLDING SARL.",
};

export default function PartenairesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Partners />
        <OtherPartners />
      </div>
      <Footer />
    </main>
  );
}
