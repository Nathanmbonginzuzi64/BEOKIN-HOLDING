import Image from "next/image";

const partners = [
  {
    name: "Microsoft",
    logo: "/images/partners/microsoft.png",
    description: "Partenaire technologique pour les solutions cloud et entreprise",
  },
  {
    name: "Cisco",
    logo: "/images/partners/cisco.png",
    description: "Solutions réseau et infrastructure",
  },
  {
    name: "Dell Technologies",
    logo: "/images/partners/dell.png",
    description: "Équipements informatiques et serveurs",
  },
  {
    name: "Hikvision",
    logo: "/images/partners/hikvision.png",
    description: "Systèmes de vidéosurveillance et sécurité",
  },
  {
    name: "John Deere",
    logo: "/images/partners/johndeere.png",
    description: "Équipements agricoles et technologies",
  },
  {
    name: "Caterpillar",
    logo: "/images/partners/caterpillar.png",
    description: "Engins de construction et équipements lourds",
  },
];

export function Partners() {
  return (
    <section id="partners" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Nos partenaires
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Nous collaborons avec les leaders mondiaux de la technologie pour vous offrir les meilleures solutions.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 transition-all hover:border-beokin-blue/50 hover:shadow-lg"
            >
              <div className="relative h-16 w-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-4 text-xs text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Vous souhaitez devenir partenaire ?{" "}
            <a href="#contact" className="text-beokin-blue hover:underline font-medium">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
