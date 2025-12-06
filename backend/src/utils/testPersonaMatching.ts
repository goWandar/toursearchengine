import { prisma } from '../db/prisma.js';
import { logger } from '../utils/logger.js';

// import your findMatchingPersona from where you wrote it
import { determinePersona } from '../services/quiz/helpers/persona.helpers.js';

async function testPersonaMatch() {
  logger.info('Testing persona matching logic...');

  const mockUserTags = [
    { tagKey: 'persona:couple' },
    { tagKey: 'style:relaxed' },
    { tagKey: 'budget:luxury' },
    { tagKey: 'interest:culture' },
  ];

  try {
    const personaId = await determinePersona(mockUserTags);
    if (!personaId) {
      logger.warn('No matching persona found.');
      process.exit(0);
    }

    // const persona = await prisma.quizPersona.findUnique({ where: { id: personaId } });

    logger.success('Matching persona found:', personaId);
    // console.log({
    //   id: persona?.id,
    //   name: persona?.name,
    //   description: persona?.description,
    //   keyTraits: persona?.keyTraits,
    //   tagMapping: persona?.tagMapping,
    // });
  } catch (err) {
    logger.error('Persona match test failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testPersonaMatch();
