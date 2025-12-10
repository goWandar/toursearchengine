import { prisma } from '../db/prisma.js';
import { logger } from '../utils/logger.js';

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

    logger.success('Matching persona found:', personaId);
  } catch (err) {
    logger.error('Persona match test failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testPersonaMatch();
