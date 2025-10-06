import { cache } from "react";
import { fallbackSections, type SectionWithServices } from "./sections-fallback";

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

async function getPrisma() {
  const { default: prisma } = await import("./prisma");
  return prisma;
}

async function fetchSectionsFromDatabase() {
  const prisma = await getPrisma();

  return prisma.section.findMany({
    orderBy: { position: "asc" },
    include: {
      services: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export const getAllSections = cache(async (): Promise<SectionWithServices[]> => {
  if (!hasDatabaseUrl) {
    return fallbackSections;
  }

  return fetchSectionsFromDatabase();
});

async function fetchSectionBySlugFromDatabase(slug: string) {
  const prisma = await getPrisma();

  return prisma.section.findUnique({
    where: { slug },
    include: {
      services: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export const getSectionBySlug = cache(async (slug: string) => {
  if (!hasDatabaseUrl) {
    return fallbackSections.find((section) => section.slug === slug) ?? null;
  }

  return fetchSectionBySlugFromDatabase(slug);
});