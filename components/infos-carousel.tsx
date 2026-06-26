"use client";

import { useCallback, useEffect, useState } from "react";
import { InfoPostCard } from "@/components/info-post-card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { InfoPost } from "@/lib/infos-storage";

const AUTOPLAY_DELAY = 5000;
const CARDS_PER_SECTION = 4;

type InfosCarouselProps = {
  infos: InfoPost[];
};

export function chunkInfos(infos: InfoPost[], size = CARDS_PER_SECTION): InfoPost[][] {
  const chunks: InfoPost[][] = [];

  for (let i = 0; i < infos.length; i += size) {
    chunks.push(infos.slice(i, i + size));
  }

  return chunks;
}

export function InfosCarousel({ infos }: InfosCarouselProps) {
  const sections = chunkInfos(infos);
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
    if (!api || isPaused || sections.length <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [api, isPaused, current, sections.length]);

  if (infos.length === 0) return null;

  return (
    <div
      className="relative mt-10 px-10 sm:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: sections.length > 1,
          direction: "ltr",
        }}
        className="w-full"
      >
        <CarouselContent>
          {sections.map((section, sectionIndex) => (
            <CarouselItem key={sectionIndex} className="basis-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {section.map((info, cardIndex) => (
                  <div key={info.id}>
                    <InfoPostCard
                      info={info}
                      variant="carousel"
                      index={sectionIndex * CARDS_PER_SECTION + cardIndex}
                    />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {sections.length > 1 && (
          <>
            <CarouselPrevious className="left-0 border-beokin-blue/30 bg-background/90 hover:bg-beokin-blue/10" />
            <CarouselNext className="right-0 border-beokin-blue/30 bg-background/90 hover:bg-beokin-blue/10" />
          </>
        )}
      </Carousel>

      {sections.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Afficher la section ${index + 1}`}
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
      )}
    </div>
  );
}
