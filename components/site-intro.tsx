"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type IntroPhase = "enter" | "exit" | "hidden";

const INTRO_DURATION_MS = 3500;
const EXIT_DURATION_MS = 800;

export function SiteIntro() {
  const pathname = usePathname();
  const skipIntro = pathname.startsWith("/admin");
  const [phase, setPhase] = useState<IntroPhase>(skipIntro ? "hidden" : "enter");

  useEffect(() => {
    if (skipIntro) {
      setPhase("hidden");
      return;
    }

    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => {
      setPhase("exit");
    }, INTRO_DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
    }, INTRO_DURATION_MS + EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [skipIntro]);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`site-intro-overlay ${phase === "exit" ? "site-intro-overlay--exit" : ""}`}
      aria-hidden={phase === "exit"}
    >
      <div className="site-intro-glow" />

      <div className="site-intro-content">
        <div className="site-intro-logo-wrap">
          <Image
            src="/logo.png"
            alt="BEOKIN HOLDING SARL"
            width={240}
            height={68}
            priority
            className="site-intro-logo h-14 w-auto sm:h-16"
          />
        </div>

        <p className="site-intro-tagline">Solutions informatiques innovantes</p>

        <div className="site-intro-progress-track">
          <div className="site-intro-progress-bar" />
        </div>

        <div className="site-intro-dots" aria-hidden="true">
          <span className="site-intro-dot site-intro-dot--red" />
          <span className="site-intro-dot site-intro-dot--yellow" />
          <span className="site-intro-dot site-intro-dot--blue" />
        </div>
      </div>
    </div>
  );
}
