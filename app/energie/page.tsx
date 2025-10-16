import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSectionBySlug } from "@/lib/sections";

const SLUG = "energie";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    return {
      title: "Energie",
      description: "Solutions solaires et electriques pour vos sites.",
    };
  }

  return {
    title: section.title,
    description: section.description ?? section.subtitle ?? undefined,
  };
}

export default async function EnergyPage() {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    notFound();
  }

  redirect(`/#${SLUG}`);
}
