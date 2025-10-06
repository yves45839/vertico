import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-32 text-amber-50">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/energy-loop.gif"
          alt="Animation solaire abstraite"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="energy-gradient absolute inset-0 opacity-95" aria-hidden="true" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
            {section.subtitle}
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{section.title}</h1>
          {section.description && (
            <p className="max-w-3xl text-base text-amber-100/85 md:text-lg">
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
                className="flex flex-col justify-between rounded-2xl border border-amber-200/35 bg-white/10 p-6 backdrop-blur-lg transition hover:border-amber-300/60 hover:bg-white/20"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">{service.title}</h2>
                  <p className="text-sm text-amber-100/85">{service.summary}</p>
                  {service.body && (
                    <p className="text-sm text-amber-100/70">{service.body}</p>
                  )}
                </div>
                {highlights.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-amber-100/90">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-amber-200/50 bg-amber-200/15 px-3 py-1"
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