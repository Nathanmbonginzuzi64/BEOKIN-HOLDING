"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdminLoginPanelProps = {
  password: string;
  error: string;
  loading: boolean;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function AdminLoginPanel({
  password,
  error,
  loading,
  onPasswordChange,
  onSubmit,
}: AdminLoginPanelProps) {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-6 pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_55%)]" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au site
        </Link>

        <Card className="overflow-hidden border-beokin-blue/20 shadow-lg">
          <div className="h-1.5 bg-gradient-to-r from-beokin-red via-beokin-yellow to-beokin-blue" />

          <CardHeader className="space-y-4 border-b bg-secondary/20">
            <div className="flex items-center justify-between gap-4">
              <Logo compact />
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-beokin-blue/10 text-beokin-blue">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Espace administration</CardTitle>
              <CardDescription className="mt-2">
                Connectez-vous pour publier et gérer les informations du site.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Mot de passe administrateur
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(event) => onPasswordChange(event.target.value)}
                  placeholder="Saisissez votre mot de passe"
                  autoComplete="current-password"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Utilisez le mot de passe fourni par l&apos;équipe technique.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="h-11 w-full bg-beokin-blue hover:bg-beokin-blue/90"
                disabled={loading || !password.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours…
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t bg-secondary/10 text-xs text-muted-foreground">
            Accès réservé aux administrateurs BEOKIN HOLDING.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
