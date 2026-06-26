import { PartnersCarousel } from "@/components/partners-carousel";

export function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Nos partenaires
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ils nous font confiance
          </h2>
        </div>

        <PartnersCarousel />
      </div>
    </section>
  );
}
