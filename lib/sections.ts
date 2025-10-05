import { cache } from "react";
import prisma from "./prisma";

export const getAllSections = cache(async () => {
  const sections = await prisma.section.findMany({
    orderBy: { position: "asc" },
    include: {
      services: {
        orderBy: { order: "asc" },
      },
    },
  });

  return sections;
});

export const getSectionBySlug = cache(async (slug: string) => {
  const section = await prisma.section.findUnique({
    where: { slug },
    include: {
      services: {
        orderBy: { order: "asc" },
      },
    },
  });

  return section;
});