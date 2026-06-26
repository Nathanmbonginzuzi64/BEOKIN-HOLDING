"use client";

import { useInfos } from "@/components/infos-provider";
import { InfosCarousel } from "@/components/infos-carousel";

type InfosSectionProps = {
  fullPage?: boolean;
};

export function InfosSection({ fullPage = false }: InfosSectionProps) {
  const { infos } = useInfos();

  if (!fullPage && infos.length === 0) return null;

  return (
    <section
      id="infos"
      className={`bg-secondary/30 ${fullPage ? "pt-28 pb-24 sm:pt-32 sm:pb-32" : "py-24 sm:py-32"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Actualités & annonces
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Infos
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Retrouvez ici les dernières publications de BEOKIN HOLDING SARL : annonces
            officielles, actualités de l&apos;entreprise, événements à venir et informations
            utiles pour nos clients, partenaires et collaborateurs.
          </p>
        </div>

        {infos.length === 0 ? (
          <p className="mx-auto mt-16 max-w-xl text-center text-muted-foreground">
            Aucune publication pour le moment.
          </p>
        ) : (
          <InfosCarousel infos={infos} />
        )}
      </div>
    </section>
  );
}
