"use client";

import Image from "next/image";
import {
  Calendar,
  FileText,
  ImagePlus,
  MapPin,
  Tag,
  User,
  X,
} from "lucide-react";
import type { PublishInfoInput } from "@/lib/infos-types";
import { INFO_IMAGE_SIZE_HINT } from "@/lib/info-image-limits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CATEGORY_PRESETS = ["Annonce", "Événement", "Partenariat", "Actualité"];

export type InfoFormState = PublishInfoInput & { image: string };

type InfoPublishFormProps = {
  form: InfoFormState;
  editingId: string | null;
  submitting: boolean;
  error: string;
  onFieldChange: (field: keyof InfoFormState, value: string) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
};

function formatPreviewDate(value: string) {
  if (!value) return "Date non définie";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function InfoPublishForm({
  form,
  editingId,
  submitting,
  error,
  onFieldChange,
  onImageChange,
  onSubmit,
  onCancel,
}: InfoPublishFormProps) {
  const contentLength = form.content.length;
  const summaryLength = form.summary.length;

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden py-0">
          <CardHeader className="border-b bg-secondary/20 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl">
                  {editingId ? "Modifier la publication" : "Nouvelle publication"}
                </CardTitle>
                <CardDescription className="mt-1">
                  Renseignez les informations visibles sur la page Infos.
                </CardDescription>
              </div>
              {editingId && (
                <Badge variant="outline" className="border-beokin-blue/30 bg-beokin-blue/10 text-beokin-blue">
                  Mode édition
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-6">
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4 text-beokin-blue" />
                Contenu principal
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) => onFieldChange("title", event.target.value)}
                  placeholder="Ex. Lancement d'un nouveau partenariat stratégique"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="summary">Résumé</Label>
                  <span className="text-xs text-muted-foreground">{summaryLength}/180</span>
                </div>
                <Textarea
                  id="summary"
                  rows={3}
                  maxLength={180}
                  value={form.summary}
                  onChange={(event) => onFieldChange("summary", event.target.value)}
                  placeholder="Courte description affichée dans la liste des publications"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="content">Contenu détaillé *</Label>
                  <span className="text-xs text-muted-foreground">{contentLength} caractères</span>
                </div>
                <Textarea
                  id="content"
                  rows={8}
                  value={form.content}
                  onChange={(event) => onFieldChange("content", event.target.value)}
                  placeholder="Détaillez l'information, le contexte et les points importants…"
                  required
                  className="min-h-[180px]"
                />
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Tag className="h-4 w-4 text-beokin-blue" />
                Métadonnées
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_PRESETS.map((category) => (
                    <Button
                      key={category}
                      type="button"
                      size="sm"
                      variant={form.category === category ? "default" : "outline"}
                      className={
                        form.category === category
                          ? "bg-beokin-blue hover:bg-beokin-blue/90"
                          : undefined
                      }
                      onClick={() => onFieldChange("category", category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <Input
                  value={form.category}
                  onChange={(event) => onFieldChange("category", event.target.value)}
                  placeholder="Ou saisir une catégorie personnalisée"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Auteur
                  </Label>
                  <Input
                    id="author"
                    value={form.author}
                    onChange={(event) => onFieldChange("author", event.target.value)}
                    placeholder="Nom de l'auteur"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Lieu
                  </Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(event) => onFieldChange("location", event.target.value)}
                    placeholder="Ex. Kinshasa, RDC"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="eventDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Date de l&apos;événement
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={(event) => onFieldChange("eventDate", event.target.value)}
                  />
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <Label className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-beokin-blue" />
                Illustration
              </Label>

              {form.image ? (
                <div className="relative overflow-hidden rounded-xl border border-border">
                  <div className="relative h-56 w-full">
                    <Image
                      src={form.image}
                      alt="Aperçu de la publication"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur"
                    onClick={() => onFieldChange("image", "")}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Retirer
                  </Button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-6 py-12 transition-colors hover:border-beokin-blue/50 hover:bg-beokin-blue/5">
                  <ImagePlus className="h-9 w-9 text-muted-foreground" />
                  <span className="mt-3 text-sm font-medium text-foreground">
                    Glisser ou cliquer pour ajouter une image
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {INFO_IMAGE_SIZE_HINT}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={onImageChange}
                  />
                </label>
              )}
            </section>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t pt-6">
              <Button
                type="submit"
                className="bg-beokin-blue hover:bg-beokin-blue/90"
                disabled={submitting}
              >
                {submitting
                  ? "Enregistrement…"
                  : editingId
                    ? "Enregistrer les modifications"
                    : "Publier l'information"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit overflow-hidden py-0 xl:sticky xl:top-28">
          <CardHeader className="border-b bg-secondary/20 py-5">
            <CardTitle className="text-lg">Aperçu en direct</CardTitle>
            <CardDescription>
              Visualisation approximative de la publication sur le site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            {form.image ? (
              <div className="relative h-44 overflow-hidden rounded-lg border border-border">
                <Image
                  src={form.image}
                  alt="Aperçu"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-44 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/20 text-sm text-muted-foreground">
                Aucune image sélectionnée
              </div>
            )}

            {form.category ? (
              <Badge className="bg-beokin-blue/10 text-beokin-blue hover:bg-beokin-blue/10">
                {form.category}
              </Badge>
            ) : (
              <Badge variant="outline">Sans catégorie</Badge>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {form.title.trim() || "Titre de la publication"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {form.summary.trim() || "Le résumé apparaîtra ici."}
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-secondary/10 p-4 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Auteur :</span>{" "}
                {form.author.trim() || "Non renseigné"}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Lieu :</span>{" "}
                {form.location.trim() || "Non renseigné"}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Événement :</span>{" "}
                {formatPreviewDate(form.eventDate)}
              </p>
            </div>

            <p className="line-clamp-6 text-sm leading-relaxed text-muted-foreground">
              {form.content.trim() || "Le contenu détaillé s'affichera dans cette zone."}
            </p>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
