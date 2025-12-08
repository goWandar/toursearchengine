import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

interface PersonaMatch {
  id: number;
  name: string;
  description: string | null;
  keyTraits: string[];
  imageUrl: string | null;
  matchScore: number;
}

//  Determine persona from user tags
export async function determinePersona(
  userTags: Array<{ tagKey: string }>,
): Promise<PersonaMatch | null> {
  logger.info('[PersonaHelpers] Matching persona from database');

  try {
    const personas = await prisma.quizPersona.findMany();

    if (personas.length === 0) {
      logger.warn('[PersonaHelpers] No personas found in database');
      return null;
    }

    const tagKeys = userTags.map((t) => t.tagKey);
    let bestMatch: PersonaMatch | null = null;

    for (const persona of personas) {
      const overlap = persona.tagMapping.filter((tag) => tagKeys.includes(tag)).length;

      if (!bestMatch || overlap > bestMatch.matchScore) {
        bestMatch = {
          id: persona.id,
          name: persona.name,
          description: persona.description,
          keyTraits: persona.keyTraits,
          imageUrl: persona.imageUrl,
          matchScore: overlap,
        };
      }
    }

    if (bestMatch && bestMatch.matchScore >= 2) {
      logger.success(
        `[PersonaHelpers] Matched persona: ${bestMatch.name} (${bestMatch.matchScore} tags matched)`,
      );
      return bestMatch;
    }

    logger.warn('[PersonaHelpers] No strong persona match found');
    return null;
  } catch (error) {
    logger.error('[PersonaHelpers] Error matching persona:', error);
    return null;
  }
}
