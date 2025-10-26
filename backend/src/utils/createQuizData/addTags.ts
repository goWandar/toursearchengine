import { PrismaClient } from '@prisma/client';
import { tags } from './data/quizTags.js';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding all quiz and tour tags...');

  let successCount = 0;
  let errorCount = 0;

  for (const tag of tags) {
    try {
      // Find the category this tag belongs to
      const category = await prisma.category.findUnique({
        where: { name: tag.category },
      });

      if (!category) {
        console.warn(`Category not found for tag ${tag.key}: ${tag.category}`);
        errorCount++;
        continue;
      }

      // Create or update the tag
      await prisma.tag.upsert({
        where: { key: tag.key },
        update: {
          label: tag.label,
          categoryId: category.id,
        },
        create: {
          key: tag.key,
          label: tag.label,
          categoryId: category.id,
        },
      });

      successCount++;
    } catch (error) {
      console.error(`Failed to seed tag ${tag.key}:`, error);
      errorCount++;
    }
  }

  console.log(`${successCount} tags seeded successfully`);
  if (errorCount > 0) {
    console.log(`${errorCount} tags failed to seed`);
  }
}

main()
  .catch((e: Error) => {
    console.error('Tag seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
