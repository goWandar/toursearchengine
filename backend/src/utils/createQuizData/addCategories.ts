import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from './data/quizCategories.js';

const prisma = new PrismaClient();

interface Category {
  name: string;
  description: string;
  conflictGroupId?: number;
}

async function main(): Promise<void> {
  console.log('Adding/Updating Mock Categories & Conflict Groups...');

  // ensure all conflict groups used in categories exist
  const conflictGroupNames = Array.from(
    new Set(
      CATEGORIES.filter((categories) => categories.conflictGroupName).map(
        (categories) => categories.conflictGroupName as string,
      ),
    ),
  );

  // Lookup table: maps conflict group names to their DB IDs for category linking
  const conflictGroupMap: Record<string, number> = {};

  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: {
        description: c.description,
        conflictGroupId: c.conflictGroupName ? conflictGroupMap[c.conflictGroupName] : null,
      },
      create: {
        name: c.name,
        description: c.description,
        conflictGroupId: c.conflictGroupName ? conflictGroupMap[c.conflictGroupName] : null,
      },
    });
  }

  console.log(`${CATEGORIES.length} categories upserted`);
}

main()
  .catch((err: Error) => {
    console.error('Category seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
