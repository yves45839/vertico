import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type SectionContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: NextRequest, context: SectionContext) {
  const { slug } = await context.params;

  const section = await prisma.section.findUnique({
    where: { slug },
    include: {
      services: { orderBy: { order: "asc" } },
    },
  });

  if (!section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  return NextResponse.json({ section });
}