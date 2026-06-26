import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    image: "/images/services/developpement.png",
    title: "Développement sur mesure",
    description: "Applications web et mobiles conçues selon vos besoins spécifiques. Technologies modernes et architecture évolutive.",
  },
  {
    image: "/images/services/infrastructure.png",
    title: "Infrastructure IT",
    description: "Mise en place et gestion de votre infrastructure informatique. Serveurs, réseaux et solutions de stockage.",
  },
  {
    image: "/images/services/cybersecurite.png",
    title: "Cybersécurité",
    description: "Protection de vos données et systèmes contre les menaces. Audit, conseil et mise en conformité.",
  },
  {
    image: "/images/services/cloud.png",
    title: "Cloud Computing",
    description: "Migration et gestion de vos services cloud. AWS, Azure, Google Cloud selon vos besoins.",
  },
  {
    image: "/images/services/transformation.png",
    title: "Transformation digitale",
    description: "Accompagnement dans votre transition numérique. Stratégie, formation et déploiement.",
  },
  {
    image: "/images/services/data.png",
    title: "Gestion de données",
    description: "Solutions de stockage, analyse et visualisation de données. Business Intelligence et Big Data.",
  },
  {
    image: "/images/services/videosurveillance.png",
    title: "Vidéosurveillance",
    description: "Installation et maintenance de systèmes de vidéosurveillance. Caméras IP, enregistreurs et monitoring à distance.",
  },
  {
    image: "/images/services/agriculture.png",
    title: "Agriculture",
    description: "Solutions technologiques pour l'agriculture moderne. Systèmes d'irrigation intelligents, drones et gestion de cultures.",
  },
  {
    image: "/images/services/signalisation.png",
    title: "Signalisation routière",
    description: "Conception et installation de panneaux de signalisation. Équipements routiers et solutions de sécurité routière.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Nos services
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Solutions informatiques complètes
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Une gamme complète de services pour répondre à tous vos besoins technologiques
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-beokin-blue/50 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link 
                  href="#contact" 
                  className="mt-4 inline-flex items-center text-sm font-medium text-beokin-blue opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  En savoir plus
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
