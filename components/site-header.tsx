"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteNavigation } from "@/lib/site-navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <div className="shrink-0">
          <Logo className="-m-1.5 p-1.5" />
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full gap-0 px-6 sm:max-w-sm">
            <SheetHeader className="px-0 pt-2 text-left">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <Logo compact className="-m-1.5 p-1.5" />
            </SheetHeader>

            <div className="mt-6 flow-root flex-1 overflow-y-auto">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {siteNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6">
                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg bg-beokin-blue px-4 py-3 text-center font-medium text-white transition-colors hover:bg-beokin-blue/90"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex lg:items-center lg:gap-x-6 xl:gap-x-8">
          {siteNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
