import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSectionBySlug } from "@/lib/sections";

const SLUG = "construction";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    return {
      title: "Construction & Amenagement",
      description: "Solutions de construction et d'amenagement sur mesure.",
    };
  }

  return {
    title: section.title,
    description: section.description ?? section.subtitle ?? undefined,
  };
}

export default async function ConstructionPage() {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    notFound();
  }

  redirect(`/#${SLUG}`);
}
