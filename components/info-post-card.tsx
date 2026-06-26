"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, User } from "lucide-react";
import type { InfoPost } from "@/lib/infos-storage";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type InfoPostCardProps = {
  info: InfoPost;
  variant?: "default" | "carousel";
  index?: number;
};

export function InfoPostCard({ info, variant = "default", index = 0 }: InfoPostCardProps) {
  const isCarousel = variant === "carousel";

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-beokin-blue/40 hover:shadow-xl animate-info-card-enter"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-secondary/40">
        {info.image ? (
          <>
            <Image
              src={info.image}
              alt={info.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            Aucune image
          </div>
        )}

        {info.category && (
          <span className="animate-info-badge absolute top-2.5 right-2.5 rounded-full bg-beokin-blue px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-transform duration-300 group-hover:scale-105 sm:top-3 sm:right-3 sm:px-3 sm:text-xs">
            {info.category}
          </span>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col transition-transform duration-300 group-hover:translate-y-0.5 ${
          isCarousel ? "p-3 sm:p-4" : "p-4 sm:p-5"
        }`}
      >
        <h3
          className={`font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-beokin-blue ${
            isCarousel ? "text-sm sm:text-base" : "text-base sm:text-lg"
          }`}
        >
          {info.title}
        </h3>

        <div className="mt-1.5 flex items-center justify-end gap-1 text-[11px] text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 sm:text-xs">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <time dateTime={info.publishedAt}>Publié le {formatDate(info.publishedAt)}</time>
        </div>

        {info.summary && (
          <p
            className={`mt-3 font-medium leading-relaxed text-foreground/90 transition-colors duration-300 ${
              isCarousel ? "line-clamp-2 text-xs sm:text-sm" : "text-sm"
            }`}
          >
            {info.summary}
          </p>
        )}

        {(info.author || info.location || info.eventDate) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground transition-all duration-300 group-hover:gap-3 sm:gap-3">
            {info.author && (
              <span className="inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                <User className="h-3.5 w-3.5" />
                {info.author}
              </span>
            )}
            {info.location && (
              <span className="inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                <MapPin className="h-3.5 w-3.5" />
                {info.location}
              </span>
            )}
            {info.eventDate && (
              <span className="inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Événement : {formatDate(info.eventDate)}
              </span>
            )}
          </div>
        )}

        {info.content && (
          <p
            className={`mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/75 ${
              isCarousel ? "line-clamp-3 flex-1 text-xs sm:text-sm" : "line-clamp-4 text-sm"
            }`}
          >
            {info.content}
          </p>
        )}

        <Link
          href={`/infos/${info.id}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-beokin-blue transition-all duration-300 hover:underline group-hover:gap-1"
        >
          Voir en détail
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
