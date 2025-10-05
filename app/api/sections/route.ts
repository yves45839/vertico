import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const withServices = url.searchParams.get("withServices") === "true";

  const sections = await prisma.section.findMany({
    orderBy: { position: "asc" },
    include: withServices
      ? {
          services: {
            orderBy: { order: "asc" },
          },
        }
      : undefined,
  });

  return NextResponse.json({ sections });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, subtitle, description, heroImage, position } = body ?? {};

    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    const section = await prisma.section.upsert({
      where: { slug },
      update: {
        title,
        subtitle,
        description,
        heroImage,
        position: typeof position === "number" ? position : undefined,
      },
      create: {
        slug,
        title,
        subtitle,
        description,
        heroImage,
        position: typeof position === "number" ? position : 0,
      },
    });

    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sections error", error);
    return NextResponse.json({ error: "Unable to save section" }, { status: 500 });
  }
}