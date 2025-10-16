import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSectionBySlug } from "@/lib/sections";

const SLUG = "eaux-irrigation";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    return {
      title: "Eaux et irrigation",
      description: "Solutions pour l'eau potable et les reseaux d'irrigation.",
    };
  }

  return {
    title: section.title,
    description: section.description ?? section.subtitle ?? undefined,
  };
}

export default async function WaterPage() {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    notFound();
  }

  redirect(`/#${SLUG}`);
}
