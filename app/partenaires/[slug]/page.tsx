import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { PartnerLogo } from "@/components/partner-logo";
import { getPartnerBySlug, allPartners } from "@/lib/partners";

type PartnerPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allPartners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return { title: "Partenaire introuvable" };
  }

  return {
    title: `${partner.name} — Partenaire BEOKIN HOLDING`,
    description: partner.tagline,
  };
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="pt-28 pb-24 sm:pt-32 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/partenaires"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux partenaires
          </Link>

          <header className="mt-8">
            <PartnerLogo
              partner={partner}
              className="flex h-20 w-full max-w-xs items-center justify-center rounded-xl border border-border bg-white px-6 py-4"
              imageClassName="h-14 w-auto max-w-full object-contain"
            />
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-beokin-blue">
              Partenaire — {partner.country}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {partner.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{partner.tagline}</p>
          </header>

          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">À propos</h2>
            {partner.about.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Points clés</h2>
            <ul className="mt-6 space-y-3">
              {partner.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-beokin-yellow" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Produits & services</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {partner.products.map((product) => (
                <li
                  key={product}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
                >
                  {product}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <Button asChild className="bg-beokin-blue hover:bg-beokin-blue/90">
              <Link href="/#contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
