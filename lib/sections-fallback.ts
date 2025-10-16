import type { Section, Service } from "@prisma/client";

export type SectionWithServices = Section & { services: Service[] };

const timestamp = new Date("2024-01-01T00:00:00Z");

const createService = (
  sectionId: string,
  id: string,
  data: Omit<Service, "id" | "sectionId" | "createdAt" | "updatedAt">
): Service => ({
  id,
  sectionId,
  createdAt: timestamp,
  updatedAt: timestamp,
  ...data,
});

const createSection = (
  id: string,
  data: Omit<Section, "id" | "createdAt" | "updatedAt"> & {
    services: Array<Omit<Service, "id" | "sectionId" | "createdAt" | "updatedAt">>;
  }
): SectionWithServices => ({
  id,
  createdAt: timestamp,
  updatedAt: timestamp,
  ...data,
  services: data.services.map((service, index) =>
    createService(id, `${id}-service-${index}`, service)
  ),
});

export const fallbackSections: SectionWithServices[] = [
  createSection("fallback-construction", {
    slug: "construction",
    title: "Construction & Amenagement",
    subtitle: "Architecturer, batir et livrer des structures durables.",
    description:
      "Accompagnement complet pour les projets residentiels et professionnels, de la conception des plans a la livraison cle en main.",
    heroImage: "/menu-construction.svg",
    position: 0,
    services: [
      {
        title: "Conception architecturale",
        summary: "Etudes techniques, modelisation BIM, permis de construire.",
        body:
          "Esquisses, plans d'execution et simulations 3D pour garantir la faisabilite et l'optimisation budgetaire de chaque projet.",
        imageUrl: "/images/construction-architectural.svg",
        highlights: ["Plans sur mesure", "Suivi administratif", "Coordination BET"],
        order: 0,
      },
      {
        title: "Gros oeuvre",
        summary: "Fondations, maconnerie, structures porteuses, dallages industriels.",
        body:
          "Maitrise du beton arme et des structures metalliques pour assurer stabilite et longevite des ouvrages.",
        imageUrl: "/images/construction-structure.svg",
        highlights: ["Fondations profondes", "Structures beton", "Charpentes metalliques"],
        order: 1,
      },
      {
        title: "Second oeuvre et finitions",
        summary: "Cloisons, menuiseries, revetements, peinture decorative.",
        body:
          "Finitions soignees avec cloisons acoustiques, sols techniques, luminaires et traitement decoratif complet.",
        imageUrl: "/images/construction-finish.svg",
        highlights: ["Revetements premium", "Cloisons techniques", "Decoration sur mesure"],
        order: 2,
      },
    ],
  }),
  createSection("fallback-eaux-irrigation", {
    slug: "eaux-irrigation",
    title: "Eaux & Irrigation",
    subtitle: "Optimiser la gestion de l'eau potable et agricole.",
    description:
      "Du forage au stockage, nous securisons l'approvisionnement en eau et automatisons les reseaux d'irrigation pour les exploitations rurales.",
    heroImage: "/menu-water.svg",
    position: 1,
    services: [
      {
        title: "Systemes d'eau potable",
        summary: "Stations de pompage, filtration, stockage de 2 000 a 19 000 L.",
        body:
          "Reseaux complets incluant traitement UV, chloration et monitoring IoT pour garantir une qualite d'eau constante.",
        imageUrl: "/images/water-potable.svg",
        highlights: ["Stations sur mesure", "Monitoring distant", "Maintenance preventive"],
        order: 0,
      },
      {
        title: "Irrigation agricole",
        summary: "Goutte-a-goutte, aspersion, pivot central et ferti-irrigation.",
        body:
          "Dimensionnement hydraulique, automatisation par vannes intelligentes et integration d'outils d'aide a la decision agronomique.",
        imageUrl: "/images/water-irrigation.svg",
        highlights: ["Optimisation hydrique", "Pilotage mobile", "Ferti-irrigation"],
        order: 1,
      },
      {
        title: "Packs hybrides eau + energie",
        summary: "Solutions combinant pompage solaire, stockage et irrigation.",
        body:
          "Systemes cle en main avec panneaux solaires, batteries et supervision pour reduire les couts d'exploitation.",
        imageUrl: "/images/water-hybrid.svg",
        highlights: ["Pompage solaire", "Autonomie energetique", "Supervision cloud"],
        order: 2,
      },
    ],
  }),
  createSection("fallback-energie", {
    slug: "energie",
    title: "Energie",
    subtitle: "Solutions solaires et electriques pour sites tropicaux.",
    description:
      "De la production photovoltaique aux tableaux electriques, nous securisons l'alimentation energetique des sites residentiels, agricoles et industriels.",
    heroImage: "/menu-energy.svg",
    position: 2,
    services: [
      {
        title: "Kits solaires residentiels",
        summary: "Autoconsommation, stockage lithium, supervision mobile.",
        body:
          "Kits modulaires avec batteries intelligentes et suivi en temps reel pour maximiser votre autonomie.",
        imageUrl: "/images/energy-residentiel.svg",
        highlights: ["Batteries lithium", "Monitoring energie", "Maintenance connectee"],
        order: 0,
      },
      {
        title: "Tableaux et coffrets electriques",
        summary: "Etudes BT/MT, distribution, protection et normes locales.",
        body:
          "Conception et cablage de tableaux automatises, coffrets de protection, ATS et armoires moteurs avec documentation complete.",
        imageUrl: "/images/energy-tableaux.svg",
        highlights: ["Norme NF C 15-100", "Automates industriels", "Tests et mise en service"],
        order: 1,
      },
      {
        title: "Solutions hybrides energie + eau",
        summary: "Combiner pompes, forage et solaire pour les zones isolees.",
        body:
          "Ingenierie de systemes hybrides integrant variateurs, generateurs et monitoring pour assurer une disponibilite 24/7.",
        imageUrl: "/images/energy-hybride.svg",
        highlights: ["Hybridation diesel-solaire", "Pilotage a distance", "Garanties de performance"],
        order: 2,
      },
    ],
  }),
];

