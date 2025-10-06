import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-32 text-orange-50">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/construction-loop.gif"
          alt="Animation abstraite de chantiers lumineux"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="construction-gradient absolute inset-0 opacity-95" aria-hidden="true" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">
            {section.subtitle}
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{section.title}</h1>
          {section.description && (
            <p className="max-w-3xl text-base text-orange-100/90 md:text-lg">
              {section.description}
            </p>
          )}
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {section.services.map((service) => {
            const highlights = Array.isArray(service.highlights)
              ? (service.highlights as string[])
              : [];

            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-orange-200/30 bg-white/10 p-6 backdrop-blur-lg transition hover:border-orange-300/60 hover:bg-white/20"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">{service.title}</h2>
                  <p className="text-sm text-orange-100/90">{service.summary}</p>
                  {service.body && (
                    <p className="text-sm text-orange-100/75">{service.body}</p>
                  )}
                </div>
                {highlights.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-orange-100/90">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-orange-200/50 bg-orange-200/15 px-3 py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}