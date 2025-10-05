import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sectionSlug = url.searchParams.get("section");

  const services = await prisma.service.findMany({
    where: sectionSlug ? { section: { slug: sectionSlug } } : undefined,
    orderBy: { order: "asc" },
    include: {
      section: true,
    },
  });

  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sectionSlug, title, summary, body: content, imageUrl, highlights, order } = body ?? {};

    if (!sectionSlug || !title || !summary) {
      return NextResponse.json({ error: "sectionSlug, title and summary are required" }, { status: 400 });
    }

    const section = await prisma.section.findUnique({ where: { slug: sectionSlug } });

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    const service = await prisma.service.create({
      data: {
        sectionId: section.id,
        title,
        summary,
        body: content,
        imageUrl,
        highlights: Array.isArray(highlights) ? highlights : undefined,
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("POST /api/services error", error);
    return NextResponse.json({ error: "Unable to save service" }, { status: 500 });
  }
}