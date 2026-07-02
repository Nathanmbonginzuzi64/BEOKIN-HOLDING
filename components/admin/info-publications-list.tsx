"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Search, Trash2 } from "lucide-react";
import type { InfoPost } from "@/lib/infos-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type InfoPublicationsListProps = {
  infos: InfoPost[];
  editingId: string | null;
  onEdit: (info: InfoPost) => void;
  onDelete: (id: string) => Promise<void>;
};

function formatShortDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function InfoPublicationsList({
  infos,
  editingId,
  onEdit,
  onDelete,
}: InfoPublicationsListProps) {
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<InfoPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredInfos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return infos;

    return infos.filter((info) =>
      [info.title, info.summary, info.category, info.author, info.location]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [infos, query]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="mt-16 border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Publications ({infos.length})
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Recherchez, modifiez ou supprimez les informations publiées.
              </p>
            </div>

            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une publication…"
                className="pl-9"
              />
            </div>
          </div>

          {infos.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
              <p className="text-sm font-medium text-foreground">Aucune publication pour le moment</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Créez votre première information pour l&apos;afficher sur le site.
              </p>
            </div>
          ) : filteredInfos.length === 0 ? (
            <p className="mt-8 rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {query} ».
            </p>
          ) : (
            <>
              <div className="mt-8 grid gap-4 md:hidden">
                {filteredInfos.map((info) => (
                  <article
                    key={info.id}
                    className={`rounded-xl border border-border bg-card p-4 shadow-sm ${
                      editingId === info.id ? "ring-2 ring-beokin-blue/30" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      {info.image ? (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
                          <Image
                            src={info.image}
                            alt={info.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/20 text-xs text-muted-foreground">
                          Sans image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        {info.category && (
                          <Badge className="mb-2 bg-beokin-blue/10 text-beokin-blue hover:bg-beokin-blue/10">
                            {info.category}
                          </Badge>
                        )}
                        <h3 className="font-medium text-foreground">{info.title}</h3>
                        {info.summary && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{info.summary}</p>
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">
                          Publié le {formatShortDate(info.publishedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => onEdit(info)}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Modifier
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(info)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[72px]">Photo</TableHead>
                      <TableHead className="min-w-[220px]">Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Auteur</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Publié le</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInfos.map((info) => (
                      <TableRow
                        key={info.id}
                        className={
                          editingId === info.id ? "bg-beokin-blue/10 hover:bg-beokin-blue/15" : undefined
                        }
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
                            <Badge className="bg-beokin-blue/10 text-beokin-blue hover:bg-beokin-blue/10">
                              {info.category}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{info.author || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">{info.location || "—"}</TableCell>
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
                              onClick={() => onEdit(info)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              title="Supprimer"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteTarget(info)}
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
            </>
          )}
        </div>
      </section>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette publication ?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `« ${deleteTarget.title} » sera définitivement supprimée du site.`
                : "Cette action est irréversible."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              {deleting ? "Suppression…" : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
