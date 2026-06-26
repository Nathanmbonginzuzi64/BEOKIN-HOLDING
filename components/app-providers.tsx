"use client";

import { InfosProvider } from "@/components/infos-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <InfosProvider>{children}</InfosProvider>;
}
