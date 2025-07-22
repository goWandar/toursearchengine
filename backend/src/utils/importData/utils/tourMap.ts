import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loadTourIdMap(): Promise<Map<string, number>> {
  const tours = await prisma.tour.findMany({ select: { id: true, uniqueId: true } });
  return new Map(tours.map((t) => [t.uniqueId, t.id]));
}
