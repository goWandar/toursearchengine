import { PrismaClient } from '@prisma/client';
import { personas } from './data/quizPersonas.js';

const prisma = new PrismaClient();

async function main() {
  console.log('[SeedPersonas] Starting persona seeding');

  try {
    for (const persona of personas) {
      const existing = await prisma.quizPersona.findUnique({
        where: { name: persona.name },
      });

      if (existing) {
        console.log(`[SeedPersonas] Persona "${persona.name}" already exists, updating...`);
        await prisma.quizPersona.update({
          where: { name: persona.name },
          data: persona,
        });
      } else {
        console.log(`[SeedPersonas] Creating persona "${persona.name}"...`);
        await prisma.quizPersona.create({
          data: persona,
        });
      }
    }

    console.log(`[SeedPersonas] Successfully seeded ${personas.length} personas`);
  } catch (error) {
    console.log('[SeedPersonas] Error seeding personas:', error);
    throw error;
  }
}

main()
  .catch((err: Error) => {
    console.error('Quiz data seed failed:', err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
