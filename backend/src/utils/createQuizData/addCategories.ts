import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Category {
  name: string;
  description: string;
  conflictGroupId?: number;
}

async function main(): Promise<void> {
  console.log('Adding/Updating Mock Categories & Conflict Groups...');

  // create "conflict groups" as categories if not exist
  // in Travel Style
  const travelStyle = await prisma.conflictGroup.upsert({
    where: { name: 'Travel Style' },
    update: {},
    create: {
      name: 'Travel Style',
      description: 'Different safari travel styles (cannot mix)',
    },
  });

  // in group size
  const groupSize = await prisma.conflictGroup.upsert({
    where: { name: 'Group Size' },
    update: {},
    create: {
      name: 'Group Size',
      description: 'Defines group size exclusivity',
    },
  });

  // create categories
  const categories: Category[] = [
    { name: 'Adventure', description: 'Action-packed safaris' },
    { name: 'Relaxed', description: 'Slow pace and comfort' },
    {
      name: 'Family',
      description: 'Great for families with kids',
      conflictGroupId: travelStyle.id,
    },
    { name: 'Luxury', description: 'High-end lodges and comfort' },
    { name: 'Budget', description: 'Affordable yet authentic safaris' },
    { name: 'Romantic', description: 'Perfect for couples', conflictGroupId: travelStyle.id },
    { name: 'Wildlife', description: 'Focus on animals and nature' },
    { name: 'Photography', description: 'For shutterbugs and pros' },
    { name: 'Migration', description: 'The Great Wildebeest Migration' },
    { name: 'Culture', description: 'Local traditions and people' },
    { name: 'Small Groups', description: '2–8 people', conflictGroupId: groupSize.id },
    { name: 'Large Groups', description: '9+ people', conflictGroupId: groupSize.id },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {
        description: category.description,
        conflictGroupId: category.conflictGroupId ?? null,
      },
      create: category,
    });
  }

  console.log(`${categories.length} categories upserted`);
}

main()
  .catch((err: Error) => {
    console.error('Category seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
