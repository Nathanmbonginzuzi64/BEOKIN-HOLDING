import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-beokin-blue/10 via-background to-background" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="mr-2 h-2 w-2 rounded-full bg-beokin-yellow animate-pulse" />
            Votre partenaire technologique en Afrique et dans le monde
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl text-balance">
            <span className="text-beokin-red">BEO</span>
            <span className="text-beokin-yellow">●</span>
            <span className="text-beokin-blue">KIN</span>
            <br />
            <span className="text-beokin-blue text-4xl sm:text-5xl lg:text-6xl">HOLDING SARL</span>
          </h1>
          
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto text-pretty">
            Solutions informatiques innovantes pour accompagner votre transformation digitale. 
            Expertise reconnue en RDC et à l&apos;international.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="text-base px-8 bg-beokin-blue hover:bg-beokin-blue/90">
              <Link href="#services">
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 border-beokin-blue text-beokin-blue hover:bg-beokin-blue/10">
              <Link href="#contact">
                Parlons de votre projet
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "10+", label: "Années d'expérience" },
              { value: "150+", label: "Projets réalisés" },
              { value: "50+", label: "Clients satisfaits" },
              { value: "5+", label: "Pays couverts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-beokin-blue sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
