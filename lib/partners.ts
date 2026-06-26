export type Partner = {
  slug: string;
  name: string;
  website: string;
  logo: string;
  logoContainerClassName?: string;
  country: string;
  tagline: string;
  about: string[];
  highlights: string[];
  products: string[];
};

export const partners: Partner[] = [
  {
    slug: "plamen",
    name: "Plamen",
    website: "https://www.plamen.rs/fr/le-debut/",
    logo: "/images/partners/plamen.png",
    country: "Serbie",
    tagline: "Accessoires et équipements pour réseaux électriques",
    about: [
      "Fondée en 1986 par les frères Marko et Janko Krtolica, Plamen est une entreprise familiale serbe devenue un acteur international dans l'équipement électro-énergétique.",
      "Plamen produit des équipements pour réseaux basse et moyenne tension, des armoires en polyester (SMC), des armoires de mesure séparées, avec l'ensemble du processus réalisé dans ses propres halls de production.",
      "Ses clients principaux sont les entreprises de distribution et de transmission d'énergie électrique en Europe, Afrique, Asie et Amérique du Sud. L'entreprise s'est imposée comme leader en Europe du Sud-Est.",
      "Tous les produits disposent de certifications délivrées par des laboratoires indépendants accrédités, garantissant une qualité optimale pour les appels d'offres internationaux.",
    ],
    highlights: [
      "Fondée en 1986 — entreprise familiale",
      "Export vers plus de 40 pays sur 4 continents",
      "Représentations en Russie, Roumanie et Bosnie-Herzégovine",
      "Leader en Europe du Sud-Est",
    ],
    products: [
      "Équipement pour réseaux câblés",
      "Équipement pour réseaux non isolés",
      "Équipement basse et moyenne tension",
      "Équipement ADSS",
      "Équipement de protection",
      "Armoires séparées",
    ],
  },
  {
    slug: "gosi",
    name: "GOSI",
    website: "https://www.gosi.rs/?lang=en",
    logo: "/images/partners/gosi.png",
    logoContainerClassName: "flex h-16 w-full items-center justify-center rounded-lg bg-[#1a1a1a] px-4 py-3",
    country: "Serbie",
    tagline: "Fonderie moderne — or, argent et pièces métalliques sur mesure",
    about: [
      "GOSI International est une fonderie moderne avec plus de deux décennies de tradition. Le nom de l'entreprise provient des initiales Gold & Silver (Or et Argent).",
      "L'activité principale est la coulée de produits métalliques, avec une capacité unique en Europe à créer des pièces de précision de 5 mm comme des sculptures et monuments artistiques de plusieurs mètres de haut.",
      "GOSI produit pour le sport, le secteur économique et corporate, ainsi que le secteur public (police, armée, gouvernement serbe et ministères).",
      "Présente sur le marché serbe, les anciennes républiques yougoslaves, l'UE et certains pays africains, GOSI compte plus d'un millier de clients satisfaits.",
    ],
    highlights: [
      "Plus de 20 ans de tradition",
      "Pièces de 5 mm à plusieurs mètres",
      "Plus de 1 000 clients satisfaits",
      "Présence en Europe et en Afrique",
    ],
    products: [
      "Insignes militaires et policiers",
      "Trophées et médailles sportives",
      "Porte-clés et badges publicitaires",
      "Plaques corporate",
      "Sculptures, monuments et objets d'art",
    ],
  },
  {
    slug: "fmt",
    name: "FMT",
    website: "https://fmt.rs/",
    logo: "/images/partners/fmt.png",
    country: "Serbie",
    tagline: "Fabrika Mernih Transformatora — transformateurs de mesure",
    about: [
      "FMT (Fabrika Mernih Transformatora) est un fabricant serbe spécialisé dans la production de transformateurs de mesure et d'équipements pour réseaux électriques.",
      "L'entreprise conçoit et fabrique des solutions pour la mesure et la protection des réseaux de distribution d'énergie, en répondant aux normes techniques internationales.",
      "FMT accompagne les opérateurs de réseaux et les intégrateurs dans la mise en place d'infrastructures électriques fiables et conformes aux exigences du marché.",
    ],
    highlights: [
      "Spécialiste des transformateurs de mesure",
      "Fabricant serbe reconnu",
      "Solutions pour réseaux électriques",
    ],
    products: [
      "Transformateurs de mesure",
      "Équipements pour réseaux électriques",
      "Solutions de protection et de mesure",
    ],
  },
  {
    slug: "vatrosprem",
    name: "Vatrosprem",
    website: "https://vatrosprem.rs/",
    logo: "/images/partners/vatrosprem.png",
    country: "Serbie",
    tagline: "Leader de la protection incendie en Serbie",
    about: [
      "Vatrosprem AD est le leader de la protection incendie en Serbie, avec une tradition reconnue dans le domaine de la sécurité contre les incendies.",
      "L'entreprise propose une gamme complète d'équipements : extincteurs, matériel de hydrants, équipements de protection individuelle et solutions spécialisées comme Bioversal.",
      "Vatrosprem dispose d'une boutique en ligne et assure la vente, le service et la maintenance d'équipements anti-incendie pour les particuliers, les entreprises et les institutions.",
    ],
    highlights: [
      "Leader en protection incendie en Serbie",
      "Nom avec une longue tradition",
      "Boutique en ligne et service après-vente",
    ],
    products: [
      "Extincteurs (poudre ABC, CO2, mousse)",
      "Équipement de hydrants",
      "Équipements de protection individuelle",
      "Sets anti-incendie pour foyers",
      "Armoires et supports pour extincteurs",
    ],
  },
  {
    slug: "lemi-trafo",
    name: "Lemi Trafo",
    website: "https://www.lemi-trafo.com/en/home/",
    logo: "/images/partners/lemi-trafo.png",
    country: "Bulgarie",
    tagline: "Transformateurs de distribution — huile et résine coulée",
    about: [
      "Lemi Trafo JSC est une entreprise bulgare privée fondée en 1996, située à Pernik, à 30 km de Sofia. Elle conçoit et fabrique des transformateurs de distribution triphasés modernes.",
      "Avec plus de 18 000 m² d'installations de production, l'entreprise atteint une capacité annuelle d'environ 5 000 transformateurs, soit 2 890 MVA.",
      "Lemi Trafo est certifiée ISO 9001:2015, ISO 14001:2015 et OHSAS 18001:2007. Les produits sont testés dans un laboratoire accrédité interne.",
      "L'entreprise exporte en Europe, en Afrique et au Moyen-Orient, en fournissant des transformateurs conformes aux normes locales et internationales.",
    ],
    highlights: [
      "Fondée en 1996 — Pernik, Bulgarie",
      "Capacité : ~5 000 transformateurs / an",
      "Certifications ISO 9001, ISO 14001, OHSAS 18001",
      "Export Europe, Afrique et Moyen-Orient",
    ],
    products: [
      "Transformateurs immergés dans l'huile (25 à 25 000 kVA)",
      "Transformateurs en résine coulée (100 à 5 000 kVA)",
      "Transformateurs pour postes et pylônes métalliques",
    ],
  },
];

export const otherPartners: Partner[] = [
  {
    slug: "ddk-snel",
    name: "DDK-SNEL S.A",
    website: "https://www.snel.cd/",
    logo: "/images/partners/snel.png",
    country: "République Démocratique du Congo",
    tagline: "Société Nationale d'Électricité — principal opérateur en RDC",
    about: [
      "La Société Nationale d'Électricité, SNEL SA, est le principal opérateur d'électricité en République Démocratique du Congo, avec plus de 56 ans d'expertise au service de la nation.",
      "SNEL SA produit, transporte et distribue l'énergie électrique à travers tout le territoire, en s'appuyant majoritairement sur l'hydroélectricité issue des barrages du pays.",
      "L'entreprise accompagne les particuliers, les professionnels et les industries avec des services de raccordement, d'abonnement, de facturation et de recouvrement, ainsi qu'un espace client en ligne.",
      "SNEL SA s'engage à offrir un service commercial fiable, une facturation juste et un accompagnement client de qualité, en plaçant la confiance au cœur de sa relation avec les usagers.",
    ],
    highlights: [
      "56 ans d'expertise en électricité",
      "Principal opérateur électrique en RDC",
      "2 600 MW de puissance hydroélectrique installée",
      "Plus de 1 million de clients",
      "7 000 km de lignes haute tension",
    ],
    products: [
      "Production et distribution d'électricité",
      "Raccordement basse, moyenne et haute tension",
      "Abonnement et relève de compteurs",
      "Facturation et paiement",
      "Service client et réclamations en ligne",
    ],
  },
];

export const allPartners: Partner[] = [...partners, ...otherPartners];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return allPartners.find((partner) => partner.slug === slug);
}
