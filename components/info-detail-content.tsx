"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, User } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useInfos } from "@/components/infos-provider";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function InfoDetailImage({ src, alt, category }: { src: string; alt: string; category?: string }) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-border bg-secondary/30 p-3 shadow-lg sm:p-4">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[min(70vh,640px)] w-auto max-w-full object-contain"
        />
      </div>

      {category && (
        <span className="absolute top-5 right-5 rounded-full bg-beokin-blue px-3 py-1 text-xs font-semibold text-white shadow-sm sm:top-6 sm:right-6">
          {category}
        </span>
      )}
    </div>
  );
}

export function InfoDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const { infos, isLoaded } = useInfos();

  const info = infos.find((item) => item.id === id);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  if (!info) {
    notFound();
  }

  return (
    <>
      <Header />

      <article className="pt-28 pb-24 sm:pt-32 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/infos"
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux infos
          </Link>

          {info.image && (
            <InfoDetailImage src={info.image} alt={info.title} category={info.category} />
          )}

          <header className="mt-8">
            {!info.image && info.category && (
              <span className="inline-flex items-center rounded-full bg-beokin-blue/10 px-3 py-1 text-sm font-medium text-beokin-blue">
                {info.category}
              </span>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {info.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Publié le {formatDate(info.publishedAt)}
              </span>
              {info.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {info.author}
                </span>
              )}
              {info.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {info.location}
                </span>
              )}
              {info.eventDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Événement : {formatDate(info.eventDate)}
                </span>
              )}
            </div>
          </header>

          {info.summary && (
            <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">
              {info.summary}
            </p>
          )}

          {info.content && (
            <div className="mt-8 whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {info.content}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
}
