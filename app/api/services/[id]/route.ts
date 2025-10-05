import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type ServiceContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, context: ServiceContext) {
  const { id } = await context.params;

  const service = await prisma.service.findUnique({
    where: { id },
    include: { section: true },
  });

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ service });
}

export async function PUT(req: NextRequest, context: ServiceContext) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { title, summary, body: content, imageUrl, highlights, order } = body ?? {};

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: title ?? undefined,
        summary: summary ?? undefined,
        body: content ?? undefined,
        imageUrl: imageUrl ?? undefined,
        highlights: Array.isArray(highlights) ? highlights : undefined,
        order: typeof order === "number" ? order : undefined,
      },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("PUT /api/services/[id] error", error);
    return NextResponse.json({ error: "Unable to update service" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: ServiceContext) {
  try {
    const { id } = await context.params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/services/[id] error", error);
    return NextResponse.json({ error: "Unable to delete service" }, { status: 500 });
  }
}