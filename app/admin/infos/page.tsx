"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImagePlus, Pencil, Plus, Trash2, X } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useInfos } from "@/components/infos-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const emptyForm = {
  title: "",
  summary: "",
  content: "",
  category: "",
  author: "",
  location: "",
  eventDate: "",
  image: "",
};

function formatShortDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminInfosPage() {
  const { infos, publish, update, remove } = useInfos();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(false);
  };

  const startNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEdit = (info: (typeof infos)[number]) => {
    setEditingId(info.id);
    setForm({
      title: info.title,
      summary: info.summary,
      content: info.content,
      category: info.category,
      author: info.author,
      location: info.location,
      eventDate: info.eventDate,
      image: info.image ?? "",
    });
    setMessage("");
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("L'image ne doit pas dépasser 2 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.content.trim()) {
      setError("Le titre et le contenu sont obligatoires.");
      return;
    }

    const payload = {
      title: form.title,
      summary: form.summary,
      content: form.content,
      category: form.category,
      author: form.author,
      location: form.location,
      eventDate: form.eventDate,
      image: form.image || undefined,
    };

    const wasEditing = Boolean(editingId);

    if (editingId) {
      update(editingId, payload);
    } else {
      publish(payload);
    }

    resetForm();
    setMessage(
      wasEditing
        ? "Publication modifiée avec succès."
        : "Publication ajoutée avec succès."
    );
  };

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 pt-28 lg:px-8">
        <Link
          href="/infos"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voir la page Infos
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Administration — Infos</h1>
          {!showForm && (
            <Button
              type="button"
              className="bg-beokin-blue hover:bg-beokin-blue/90"
              onClick={startNew}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle information
            </Button>
          )}
        </div>

        {message && !showForm && (
          <p className="mt-6 text-sm text-beokin-blue">{message}</p>
        )}

        {showForm && (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-xl border border-border bg-card p-6">
          {editingId && (
            <div className="rounded-lg border border-beokin-blue/30 bg-beokin-blue/10 px-4 py-3 text-sm text-foreground">
              Mode modification — les changements remplaceront la publication sélectionnée.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
                Titre *
              </label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Titre de la publication"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="summary" className="mb-2 block text-sm font-medium text-foreground">
                Résumé
              </label>
              <Input
                id="summary"
                value={form.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="Courte description de l'information"
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-foreground">
                Catégorie
              </label>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Ex. Annonce, Événement, Partenariat"
              />
            </div>

            <div>
              <label htmlFor="author" className="mb-2 block text-sm font-medium text-foreground">
                Auteur
              </label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                placeholder="Nom de l'auteur"
              />
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-foreground">
                Lieu
              </label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Ex. Kinshasa, RDC"
              />
            </div>

            <div>
              <label htmlFor="eventDate" className="mb-2 block text-sm font-medium text-foreground">
                Date de l&apos;événement
              </label>
              <Input
                id="eventDate"
                type="date"
                value={form.eventDate}
                onChange={(e) => updateField("eventDate", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-foreground">
                Contenu détaillé *
              </label>
              <textarea
                id="content"
                rows={6}
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder="Détails complets de l'information..."
                required
                className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Photo
              </label>

              {form.image ? (
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <div className="relative h-48 w-full">
                    <Image
                      src={form.image}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-3 right-3"
                    onClick={() => updateField("image", "")}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Retirer
                  </Button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-6 py-10 transition-colors hover:border-beokin-blue/50 hover:bg-beokin-blue/5">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-3 text-sm font-medium text-foreground">
                    Ajouter une photo
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG ou WEBP — max 2 Mo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-beokin-blue">{message}</p>}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="bg-beokin-blue hover:bg-beokin-blue/90">
              {editingId ? "Enregistrer les modifications" : "Publier"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setMessage("");
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
        )}
      </div>

      <section className="mt-16 border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Publications ({infos.length})
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Gérez les publications affichées sur la page Infos.
              </p>
            </div>
          </div>

          {infos.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
              Aucune publication pour le moment.
            </p>
          ) : (
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[72px]">Photo</TableHead>
                    <TableHead className="min-w-[200px]">Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Événement</TableHead>
                    <TableHead>Publié le</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {infos.map((info) => (
                    <TableRow
                      key={info.id}
                      className={editingId === info.id ? "bg-beokin-blue/10 hover:bg-beokin-blue/15" : undefined}
                    >
                      <TableCell>
                        {info.image ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded-md border border-border bg-secondary/40">
                            <Image
                              src={info.image}
                              alt={info.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-border bg-secondary/20 text-[10px] text-muted-foreground">
                            N/A
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <p className="max-w-xs font-medium text-foreground">{info.title}</p>
                        {info.summary && (
                          <p className="mt-1 max-w-xs line-clamp-2 text-xs text-muted-foreground">
                            {info.summary}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {info.category ? (
                          <span className="inline-flex rounded-full bg-beokin-blue/10 px-2.5 py-0.5 text-xs font-medium text-beokin-blue">
                            {info.category}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {info.author || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {info.location || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatShortDate(info.eventDate)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatShortDate(info.publishedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            title="Modifier"
                            onClick={() => startEdit(info)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            title="Supprimer"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (editingId === info.id) resetForm();
                              remove(info.id);
                              setMessage("Publication supprimée.");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
