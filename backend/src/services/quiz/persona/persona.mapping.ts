import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

import type { UserProfile } from '../../../types/quiz.types.js';

interface PersonaMatch {
  id: number;
  name: string;
  description: string | null;
  keyTraits: string[];
  imageUrl: string | null;
  matchScore: number;
}

interface UserTagWithMetadata {
  tagKey: string;
  tagLabel: string;
  categoryName: string;
  importance: number;
}

// Generate user profile
export function generateUserProfile(
  userTags: UserTagWithMetadata[],
  matchedPersona: PersonaMatch | null,
): UserProfile {
  const keyTraits = userTags
    .filter((tag) => tag.importance >= 4)
    .map((tag) => tag.tagLabel)
    .slice(0, 5);

  const personaName = matchedPersona?.name || generateDynamicPersonaName(userTags);
  const personaDescription =
    matchedPersona?.description ||
    `You're a traveler who values ${keyTraits.slice(0, 3).join(', ').toLowerCase()}. Your ideal safari combines these elements for an unforgettable experience.`;

  return {
    personaName,
    personaDescription,
    keyTraits: matchedPersona?.keyTraits || keyTraits,
    selectedTags: userTags.map((tag) => ({
      category: tag.categoryName,
      tagKey: tag.tagKey,
      tagLabel: tag.tagLabel,
      importance: tag.importance,
    })),
  };
}

// Generate dynamic persona name
export function generateDynamicPersonaName(userTags: UserTagWithMetadata[]): string {
  const personaTag = userTags.find((t) => t.categoryName === 'persona');
  const styleTag = userTags.find((t) => t.categoryName === 'style');

  if (personaTag && styleTag) {
    return `The ${styleTag.tagLabel} ${personaTag.tagLabel}`;
  } else if (styleTag) {
    return `The ${styleTag.tagLabel} Traveler`;
  }

  return 'The Safari Explorer';
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
