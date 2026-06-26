"use client";

import dynamic from "next/dynamic";

const AppProviders = dynamic(
  () => import("@/components/app-providers").then((module) => module.AppProviders),
  { ssr: false }
);

export function AppProvidersLoader({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
