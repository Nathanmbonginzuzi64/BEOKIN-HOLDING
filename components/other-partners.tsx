import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnerLogo } from "@/components/partner-logo";
import { otherPartners } from "@/lib/partners";

export function OtherPartners() {
  return (
    <section id="other-partners" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Autres partenaires
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Nos collaborations complémentaires
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Des partenaires institutionnels et stratégiques qui renforcent notre
            présence en République Démocratique du Congo.
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-8">
          {otherPartners.map((partner) => (
            <article
              key={partner.slug}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="shrink-0 lg:w-48">
                  <PartnerLogo
                    partner={partner}
                    className="flex h-24 w-full items-center justify-center rounded-xl border border-border bg-white px-4 py-3"
                    imageClassName="h-16 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
                    {partner.country}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{partner.name}</h3>
                  <p className="mt-2 text-muted-foreground">{partner.tagline}</p>

                  <div className="mt-6 space-y-4">
                    {partner.about.slice(0, 2).map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {partner.highlights.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-beokin-yellow" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/partenaires/${partner.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-beokin-blue hover:underline"
                  >
                    En savoir plus
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
