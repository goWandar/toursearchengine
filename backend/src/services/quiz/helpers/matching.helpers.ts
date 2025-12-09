import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

import type { Prisma } from '@prisma/client';
import type { TourRecommendation } from '../../../types/quiz.types.js';

// ================================
// PRISMA PAYLOAD TYPES
// ================================
export type TourWithCategories = Prisma.TourGetPayload<{
  include: {
    tourCategories: {
      include: {
        category: {
          include: { tags: true };
        };
      };
    };
  };
}>;

// ================================
// PERSONA TAG FILTERING LOGIC
// ================================
const PERSONA_PREFIX = 'persona:';

const PERSONA_RULES = {
  couple: ['honeymoon', 'couple', 'romantic'],
  solo: ['solo'],
  family: ['family', 'children', 'kids'],
  friends: ['friends', 'group'],
};

const PERSONA_TAGS = {
  couple: 'persona:couple',
  solo: 'persona:solo',
  family: 'persona:family',
  friends: 'persona:friends',
} as const;

function normalize(value: string | null | undefined): string {
  return (value ?? '').toLowerCase();
}

function inferPersonaTagsFromContent(content: string): string[] {
  const tags: string[] = [];

  const hasCouple = PERSONA_RULES.couple.some((kw) => content.includes(kw));
  const hasSolo = PERSONA_RULES.solo.some((kw) => content.includes(kw));
  const hasFamily = PERSONA_RULES.family.some((kw) => content.includes(kw));
  const hasFriends = PERSONA_RULES.friends.some((kw) => content.includes(kw));

  // Couple dominates over solo
  if (hasCouple) tags.push(PERSONA_TAGS.couple);
  if (hasSolo && !hasCouple) tags.push(PERSONA_TAGS.solo);
  if (hasFamily) tags.push(PERSONA_TAGS.family);
  if (hasFriends) tags.push(PERSONA_TAGS.friends);

  return [...new Set(tags)];
}

// -----------------------------------------------------------------------------------
// MAIN FUNCTION: Extract relevant tags (persona tags filtered by title/description)
// -----------------------------------------------------------------------------------
export function getRelevantTourTags(tour: TourWithCategories): string[] {
  const allTags = tour.tourCategories.flatMap((tc) => tc.category.tags.map((tag) => tag.key));

  const personaTags = allTags.filter((key) => key.startsWith(PERSONA_PREFIX));
  const nonPersonaTags = allTags.filter((key) => !key.startsWith(PERSONA_PREFIX));

  // No persona category → return everything
  if (personaTags.length === 0) {
    return [...new Set(allTags)];
  }

  const content = normalize(`${tour.title} ${tour.description ?? ''}`);

  // Infer persona tags from content
  const inferred = inferPersonaTagsFromContent(content);

  // If no persona keywords → remove persona tags entirely
  if (inferred.length === 0) {
    return [...new Set(nonPersonaTags)];
  }

  // Merge non-persona tags with inferred persona tags
  return [...new Set([...nonPersonaTags, ...inferred])];
}

// ================================
// MATCHING ALGORITHM
// ================================
function calculateTourMatch(
  userTags: Array<{ tagKey: string; importance: number }>,
  tourTags: string[],
): number {
  let matchedScore = 0;
  let totalPossibleScore = 0;

  for (const userTag of userTags) {
    totalPossibleScore += userTag.importance;

    if (tourTags.includes(userTag.tagKey)) {
      matchedScore += userTag.importance;
    }
  }

  const score = totalPossibleScore > 0 ? (matchedScore / totalPossibleScore) * 100 : 0;

  return Math.round(score);
}

// ================================
// FIND MATCHING TOURS
// ================================
export async function findMatchingTours(
  userTags: Array<{ tagId: number; tagKey: string; importance: number }>,
): Promise<TourRecommendation[]> {
  logger.info('[MatchingHelpers] Finding matching tours');

  try {
    const tours = await prisma.tour.findMany({
      where: { archived: false },
      include: {
        tourCategories: {
          include: {
            category: { include: { tags: true } },
          },
        },
        operator: true,
        country: true,
      },
      take: 100,
    });

    logger.info(`[MatchingHelpers] Found ${tours.length} tours to match against`);

    const scoredTours = tours
      .map((tour) => {
        const tourWithCategories = tour as TourWithCategories;

        const tourTags = getRelevantTourTags(tourWithCategories);

        // ==========================
        // 🚫 Persona exclusion rule
        // ==========================
        const userPersona = userTags.find((t) => t.tagKey.startsWith('persona:'))?.tagKey || null;

        const tourPersonaTags = tourTags.filter((t) => t.startsWith('persona:'));

        // Exclude strict honeymoon-only tours for solo travelers
        if (userPersona === 'persona:solo') {
          const isStrictHoneymoon =
            tourPersonaTags.length === 1 && tourPersonaTags[0] === 'persona:couple';

          if (isStrictHoneymoon) {
            return null; // exclude this tour
          }
        }

        const matchPercentage = calculateTourMatch(
          userTags.map((ut) => ({
            tagKey: ut.tagKey,
            importance: ut.importance,
          })),
          tourTags,
        );

        return { tour, matchPercentage, tourTags };
      })
      .filter((t): t is { tour: any; matchPercentage: number; tourTags: string[] } => t !== null) // TS-safe narrowing
      .filter((t) => t.matchPercentage >= 30);

    logger.info(`[MatchingHelpers] Found ${scoredTours.length} tours with >30% match`);

    // Output formatting
    const recommendations: TourRecommendation[] = scoredTours.map(
      ({ tour, matchPercentage, tourTags }) => ({
        tourId: tour.id,
        tourName: tour.title,
        operator: tour.operator?.name || 'Unknown Operator',
        matchPercentage,
        whyItFits: generateMatchReasons(userTags, tourTags),
        highlights: extractHighlights(tour),
        practicalDetails: {
          duration: `${tour.durationInDays} days`,
          priceRange: 'Contact for pricing',
          region: tour.country?.name || tour.location || 'Multiple regions',
        },
      }),
    );

    return recommendations;
  } catch (error) {
    logger.error('[MatchingHelpers] Error finding tours:', error);
    return [];
  }
}

// ================================
// WHY IT FITS
// ================================
function generateMatchReasons(
  userTags: Array<{ tagKey: string; importance: number }>,
  tourTags: string[],
): string[] {
  const reasons: string[] = [];

  for (const userTag of userTags) {
    if (userTag.importance >= 4 && tourTags.includes(userTag.tagKey)) {
      const [, value] = userTag.tagKey.split(':');
      reasons.push(`Matches your ${value?.replace(/-/g, ' ')} preference`);
    }
  }

  return reasons.slice(0, 3);
}

// ================================
// HIGHLIGHTS
// ================================
function extractHighlights(tour: any): string[] {
  const highlights: string[] = [];

  if (tour.durationInDays) {
    highlights.push(`${tour.durationInDays}-day safari experience`);
  }

  if (tour.accommodationType) {
    highlights.push(tour.accommodationType);
  }

  if (tour.location) {
    highlights.push(tour.location);
  }

  return highlights.slice(0, 3);
}

export { calculateTourMatch };
