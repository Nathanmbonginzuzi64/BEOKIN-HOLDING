"use client";

import dynamic from "next/dynamic";

export const Header = dynamic(
  () => import("@/components/site-header").then((module) => module.SiteHeader),
  {
    ssr: false,
    loading: () => (
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[57px] border-b border-border bg-background/80 backdrop-blur-md"
        aria-hidden="true"
      />
    ),
  }
);
