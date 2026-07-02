"use client";

import dynamic from "next/dynamic";
import { SiteIntro } from "@/components/site-intro";

const AppProviders = dynamic(
  () => import("@/components/app-providers").then((module) => module.AppProviders),
  { ssr: false }
);

export function AppProvidersLoader({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <SiteIntro />
      {children}
    </AppProviders>
  );
}
