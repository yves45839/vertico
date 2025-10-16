import HomePageContent, { type HomePageSection } from "@/components/HomePageContent";
import { getAllSections } from "@/lib/sections";

function normalizeHighlights(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item): item is string => item.length > 0);
}

export default async function HomePage() {
  const sections = await getAllSections();

  const mappedSections: HomePageSection[] = sections
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((section) => ({
      slug: section.slug,
      title: section.title,
      subtitle: section.subtitle ?? null,
      description: section.description ?? null,
      heroImage: section.heroImage ?? null,
      services: section.services
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((service) => ({
          id: service.id,
          title: service.title,
          summary: service.summary,
          body: service.body ?? null,
          imageUrl: service.imageUrl ?? null,
          highlights: normalizeHighlights(service.highlights ?? []),
        })),
    }));

  return <HomePageContent sections={mappedSections} />;
}
