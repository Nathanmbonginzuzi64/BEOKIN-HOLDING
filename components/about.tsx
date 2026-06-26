import { CheckCircle } from "lucide-react";

const values = [
  "Excellence technique et innovation continue",
  "Engagement envers la satisfaction client",
  "Expertise locale avec vision internationale",
  "Solutions adaptées au contexte africain",
  "Partenariats durables et de confiance",
  "Transfert de compétences et formation",
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
              À propos de nous
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Votre partenaire technologique de confiance
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              BEOKIN HOLDING SARL est une entreprise spécialisée dans la prestation de services 
              informatiques, basée en République Démocratique du Congo avec une portée internationale.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Depuis notre création, nous accompagnons les entreprises et institutions dans leur 
              transformation digitale, en proposant des solutions innovantes et adaptées aux réalités 
              du marché africain tout en respectant les standards internationaux.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-beokin-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-beokin-blue/20 via-beokin-yellow/10 to-background border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-beokin-blue mb-4">10+</div>
                  <p className="text-lg text-muted-foreground">
                    Années d&apos;excellence<br />dans le secteur IT
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 h-24 w-24 rounded-full border border-beokin-blue/20" />
              <div className="absolute bottom-8 left-8 h-32 w-32 rounded-full border border-beokin-yellow/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full border border-border opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
