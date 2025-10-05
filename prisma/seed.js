const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sections = [
  {
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
        imageUrl: null,
        highlights: ["Plans sur mesure", "Suivi administratif", "Coordination BET"],
      },
      {
        title: "Gros oeuvre",
        summary: "Fondations, maconnerie, structures porteuses, dallages industriels.",
        body:
          "Maitrise du beton arme et des structures metalliques pour assurer stabilite et longevite des ouvrages.",
        imageUrl: null,
        highlights: ["Fondations profondes", "Structures beton", "Charpentes metalliques"],
      },
      {
        title: "Second oeuvre et finitions",
        summary: "Cloisons, menuiseries, revetements, peinture decorative.",
        body:
          "Finitions soignees avec cloisons acoustiques, sols techniques, luminaires et traitement decoratif complet.",
        imageUrl: null,
        highlights: ["Revetements premium", "Cloisons techniques", "Decoration sur mesure"],
      },
    ],
  },
  {
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
        imageUrl: null,
        highlights: ["Stations sur mesure", "Monitoring distant", "Maintenance preventive"],
      },
      {
        title: "Irrigation agricole",
        summary: "Goutte-a-goutte, aspersion, pivot central et ferti-irrigation.",
        body:
          "Dimensionnement hydraulique, automatisation par vannes intelligentes et integration d'outils d'aide a la decision agronomique.",
        imageUrl: null,
        highlights: ["Optimisation hydrique", "Pilotage mobile", "Ferti-irrigation"],
      },
      {
        title: "Packs hybrides eau + energie",
        summary: "Solutions combinant pompage solaire, stockage et irrigation.",
        body:
          "Systemes cle en main avec panneaux solaires, batteries et supervision pour reduire les couts d'exploitation.",
        imageUrl: null,
        highlights: ["Pompage solaire", "Autonomie energetique", "Supervision cloud"],
      },
    ],
  },
  {
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
        imageUrl: null,
        highlights: ["Batteries lithium", "Monitoring energie", "Maintenance connectee"],
      },
      {
        title: "Tableaux et coffrets electriques",
        summary: "Etudes BT/MT, distribution, protection et normes locales.",
        body:
          "Conception et cablage de tableaux automatises, coffrets de protection, ATS et armoires moteurs avec documentation complete.",
        imageUrl: null,
        highlights: ["Norme NF C 15-100", "Automates industriels", "Tests et mise en service"],
      },
      {
        title: "Solutions hybrides energie + eau",
        summary: "Combiner pompes, forage et solaire pour les zones isolees.",
        body:
          "Ingenierie de systemes hybrides integrant variateurs, generateurs et monitoring pour assurer une disponibilite 24/7.",
        imageUrl: null,
        highlights: ["Hybridation diesel-solaire", "Pilotage a distance", "Garanties de performance"],
      },
    ],
  },
];

async function main() {
  for (const section of sections) {
    const sectionRecord = await prisma.section.upsert({
      where: { slug: section.slug },
      create: {
        slug: section.slug,
        title: section.title,
        subtitle: section.subtitle,
        description: section.description,
        heroImage: section.heroImage,
        position: section.position,
      },
      update: {
        title: section.title,
        subtitle: section.subtitle,
        description: section.description,
        heroImage: section.heroImage,
        position: section.position,
      },
    });

    await prisma.service.deleteMany({ where: { sectionId: sectionRecord.id } });

    for (const [order, service] of section.services.entries()) {
      await prisma.service.create({
        data: {
          sectionId: sectionRecord.id,
          title: service.title,
          summary: service.summary,
          body: service.body,
          imageUrl: service.imageUrl,
          highlights: service.highlights,
          order,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });