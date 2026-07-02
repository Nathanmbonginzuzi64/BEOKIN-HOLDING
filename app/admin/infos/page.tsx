"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, LogOut, Newspaper, Plus } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useInfos } from "@/components/infos-provider";
import { AdminLoginPanel } from "@/components/admin/admin-login-panel";
import {
  InfoPublishForm,
  type InfoFormState,
} from "@/components/admin/info-publish-form";
import { InfoPublicationsList } from "@/components/admin/info-publications-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  isAdminAuthenticated,
  loginAdmin,
  clearAdminToken,
} from "@/lib/infos-api-client";
import { validateInfoImageFileSize } from "@/lib/info-image-limits";

const emptyForm: InfoFormState = {
  title: "",
  summary: "",
  content: "",
  category: "",
  author: "",
  location: "",
  eventDate: "",
  image: "",
};

export default function AdminInfosPage() {
  const { infos, publish, update, remove } = useInfos();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      await loginAdmin(password);
      setAuthenticated(true);
      setPassword("");
    } catch {
      setAuthError("Mot de passe incorrect. Vérifiez vos identifiants et réessayez.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setAuthenticated(false);
    resetForm();
    setMessage("");
  };

  const updateField = (field: keyof InfoFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
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

    const sizeError = validateInfoImageFileSize(file.size);
    if (sizeError) {
      setError(sizeError);
      event.target.value = "";
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

  const handleSubmit = async (event: React.FormEvent) => {
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
    setSubmitting(true);

    try {
      if (editingId) {
        await update(editingId, payload);
      } else {
        await publish(payload);
      }

      resetForm();
      setMessage(
        wasEditing
          ? "Publication modifiée avec succès."
          : "Publication ajoutée avec succès."
      );
    } catch {
      setError("Impossible d'enregistrer la publication. Vérifiez votre connexion admin.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <AdminLoginPanel
          password={password}
          error={authError}
          loading={authLoading}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-secondary/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-28 pb-8 lg:px-8">
          <Link
            href="/infos"
            className="inline-flex w-fit items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voir la page Infos publique
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-beokin-blue/10 text-beokin-blue">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Administration Infos</h1>
                  <p className="text-sm text-muted-foreground">
                    Publiez et gérez les actualités visibles sur le site.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <Newspaper className="h-3.5 w-3.5" />
                  {infos.length} publication{infos.length > 1 ? "s" : ""}
                </Badge>
                <Badge className="bg-beokin-blue/10 text-beokin-blue hover:bg-beokin-blue/10">
                  Connecté en tant qu&apos;admin
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {!showForm && (
                <Button
                  type="button"
                  className="bg-beokin-blue hover:bg-beokin-blue/90"
                  onClick={startNew}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle publication
                </Button>
              )}
              <Button type="button" variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {message && !showForm && (
          <Alert className="mt-8 border-beokin-blue/30 bg-beokin-blue/10">
            <AlertDescription className="text-foreground">{message}</AlertDescription>
          </Alert>
        )}

        {showForm ? (
          <InfoPublishForm
            form={form}
            editingId={editingId}
            submitting={submitting}
            error={error}
            onFieldChange={updateField}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              resetForm();
              setMessage("");
            }}
          />
        ) : (
          <div className="py-10">
            <div className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
              <p className="text-sm font-medium text-foreground">Prêt à publier une information ?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Créez une nouvelle publication ou modifiez une entrée existante dans la liste ci-dessous.
              </p>
              <Button
                type="button"
                className="mt-5 bg-beokin-blue hover:bg-beokin-blue/90"
                onClick={startNew}
              >
                <Plus className="mr-2 h-4 w-4" />
                Créer une publication
              </Button>
            </div>
          </div>
        )}
      </div>

      <InfoPublicationsList
        infos={infos}
        editingId={editingId}
        onEdit={startEdit}
        onDelete={async (id) => {
          if (editingId === id) resetForm();
          await remove(id);
          setMessage("Publication supprimée.");
        }}
      />

      <Footer />
    </main>
  );
}
