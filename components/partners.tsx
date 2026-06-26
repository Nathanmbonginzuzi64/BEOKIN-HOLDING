import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cloud,
  Handshake,
  Network,
  Shield,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const partnershipTypes = [
  {
    icon: Handshake,
    title: "Partenaires technologiques",
    description:
      "Éditeurs et constructeurs mondiaux pour déployer des solutions certifiées et évolutives.",
  },
  {
    icon: Building2,
    title: "Partenaires institutionnels",
    description:
      "Administrations, entreprises publiques et organisations pour des projets à fort impact.",
  },
  {
    icon: Shield,
    title: "Partenaires de confiance",
    description:
      "Intégrateurs et consultants sélectionnés pour garantir qualité, conformité et support local.",
  },
];

const partners = [
  {
    name: "Microsoft",
    category: "Cloud & entreprise",
    icon: Cloud,
    description:
      "Déploiement de Microsoft 365, Azure et solutions collaboratives pour la productivité des entreprises.",
    collaboration: "Cloud, messagerie, cybersécurité",
  },
  {
    name: "Cisco",
    category: "Réseaux & infrastructure",
    icon: Network,
    description:
      "Conception et maintenance de réseaux d'entreprise, commutateurs, routeurs et solutions Wi-Fi.",
    collaboration: "Infrastructure réseau, connectivité",
  },
  {
    name: "Dell Technologies",
    category: "Matériel informatique",
    icon: Building2,
    description:
      "Fourniture de serveurs, postes de travail et solutions de stockage adaptées aux besoins métiers.",
    collaboration: "Serveurs, stockage, postes de travail",
  },
  {
    name: "Hikvision",
    category: "Vidéosurveillance",
    icon: Shield,
    description:
      "Installation de systèmes de caméras IP, enregistrement et supervision à distance pour la sécurité.",
    collaboration: "Sécurité physique, monitoring",
  },
  {
    name: "John Deere",
    category: "Agriculture",
    icon: Sprout,
    description:
      "Solutions agricoles connectées : équipements, capteurs et outils de gestion des exploitations.",
    collaboration: "Agri-tech, équipements agricoles",
  },
  {
    name: "Caterpillar",
    category: "Équipements lourds",
    icon: Truck,
    description:
      "Accompagnement sur les projets d'infrastructure, BTP et équipements industriels lourds.",
    collaboration: "BTP, infrastructures, industrie",
  },
];

const commitments = [
  "Solutions certifiées et conformes aux standards internationaux",
  "Support technique local en République Démocratique du Congo",
  "Accompagnement de bout en bout : conseil, déploiement et maintenance",
  "Transfert de compétences pour vos équipes internes",
];

export function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Nos partenaires
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Un écosystème de partenaires au service de vos projets
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            BEOKIN HOLDING SARL s&apos;appuie sur un réseau de partenaires reconnus pour
            proposer des solutions fiables en informatique, sécurité, agriculture et
            infrastructures en RDC et à l&apos;international.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {partnershipTypes.map((type) => (
            <div
              key={type.title}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-beokin-blue/10 text-beokin-blue">
                <type.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Ils nous font confiance
          </h3>
          <p className="mt-4 text-muted-foreground">
            Des acteurs majeurs avec lesquels nous collaborons pour répondre aux besoins de
            nos clients.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-beokin-blue/50 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-beokin-blue/20 to-beokin-yellow/10 text-beokin-blue">
                  <partner.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {partner.category}
                </span>
              </div>
              <h4 className="mt-5 text-xl font-semibold text-foreground">{partner.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {partner.description}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-beokin-blue">
                Domaines : {partner.collaboration}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
              Notre engagement
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              Des partenariats durables, orientés résultats
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Chaque collaboration est pensée pour créer de la valeur : meilleure performance
              technique, réduction des risques et accompagnement adapté au contexte congolais.
            </p>
            <ul className="mt-8 space-y-4">
              {commitments.map((commitment) => (
                <li key={commitment} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-beokin-yellow" />
                  {commitment}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-foreground">
              Devenir partenaire de BEOKIN HOLDING
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Vous êtes éditeur, intégrateur, distributeur ou institution et souhaitez
              développer vos activités en RDC ? Rejoignez notre réseau de partenaires pour
              co-construire des solutions innovantes et accessibles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-beokin-blue hover:bg-beokin-blue/90">
                <Link href="#contact">
                  Proposer un partenariat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-beokin-blue text-beokin-blue hover:bg-beokin-blue/10">
                <Link href="#services">Voir nos services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
