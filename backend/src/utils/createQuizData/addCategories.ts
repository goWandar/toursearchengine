import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from './data/quizCategories.js';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Adding/Updating Mock Categories & Conflict Groups...');

  // Step 1: Get all unique conflict group names from categories
  const conflictGroupNames = Array.from(
    new Set(
      CATEGORIES.filter((categories) => categories.conflictGroupName).map(
        (categories) => categories.conflictGroupName as string,
      ),
    ),
  );

  console.log(`Found ${conflictGroupNames.length} unique conflict groups`);

  // Step 2: Create/upsert conflict groups and build lookup map
  const conflictGroupMap: Record<string, number> = {};

  for (const groupName of conflictGroupNames) {
    const conflictGroup = await prisma.conflictGroup.upsert({
      where: { name: groupName },
      update: {},
      create: {
        name: groupName,
        description: getConflictGroupDescription(groupName),
      },
    });

    conflictGroupMap[groupName] = conflictGroup.id;
    console.log(`✓ Conflict group "${groupName}" (ID: ${conflictGroup.id})`);
  }

  // Step 3: Upsert categories with conflict group links
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

  console.log(`${CATEGORIES.length} categories upsert`);
}

/**
 * Get description for conflict group based on name
 */
function getConflictGroupDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'Travel Style': 'Different safari travel styles (cannot mix)',
    'Group Size': 'Defines group size exclusivity',
    'Persona Exclusivity': 'Solo and Couple personas are mutually exclusive',
  };

  return descriptions[name] || `${name} conflict group`;
}

main()
  .catch((err: Error) => {
    console.error('Category seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
