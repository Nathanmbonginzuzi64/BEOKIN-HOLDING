"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnerLogo } from "@/components/partner-logo";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { partners } from "@/lib/partners";

const AUTOPLAY_DELAY = 4000;

export function PartnersCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [api, isPaused, current]);

  return (
    <div
      className="relative mx-auto mt-16 max-w-5xl px-12 sm:px-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {partners.map((partner) => (
            <CarouselItem
              key={partner.slug}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/partenaires/${partner.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-beokin-blue/50 hover:shadow-lg"
              >
                <PartnerLogo partner={partner} />
                <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-beokin-blue transition-colors">
                  {partner.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{partner.tagline}</p>
                <p className="mt-4 inline-flex items-center text-sm font-medium text-beokin-blue">
                  En savoir plus
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 border-beokin-blue/30 bg-background/90 hover:bg-beokin-blue/10" />
        <CarouselNext className="right-0 border-beokin-blue/30 bg-background/90 hover:bg-beokin-blue/10" />
      </Carousel>

      <div className="mt-8 flex justify-center gap-2">
        {partners.map((partner, index) => (
          <button
            key={partner.slug}
            type="button"
            aria-label={`Afficher ${partner.name}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              current === index
                ? "w-8 bg-beokin-blue"
                : "w-2 bg-muted-foreground/40 hover:bg-beokin-blue/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
