import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

import { getRelevantTourTags } from '../matching/matching.tags.js';
import {
  calculateTourMatch,
  generateMatchReasons,
  extractHighlights,
} from '../matching/matching.scoring.js';

import type { TourRecommendation, TourWithCategories } from '../../../types/quiz.types.js';

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
        // Persona exclusion rule
        // ==========================
        const userPersona = userTags.find((t) => t.tagKey.startsWith('persona:'))?.tagKey || null;

        const tourPersonaTags = tourTags.filter((t) => t.startsWith('persona:'));

        // Exclude strict honeymoon-only tours for solo travelers
        if (userPersona === 'persona:solo') {
          const isStrictHoneymoon =
            tourPersonaTags.length === 1 && tourPersonaTags[0] === 'persona:couple';

          if (isStrictHoneymoon) {
            return null;
          }
        }

        const matchPercentage = calculateTourMatch(
          userTags.map((ut) => ({
            tagKey: ut.tagKey,
            importance: ut.importance,
          })),
          tourTags,
        );

        if (matchPercentage >= 30) {
          logger.info(
            `[MatchingHelpers] Scored tour "${tour.title}" – match ${matchPercentage}%, persona tags: ${
              tourPersonaTags.join(', ') || '(none)'
            }`,
          );
        }

        return { tour, matchPercentage, tourTags };
      })
      .filter((t): t is { tour: any; matchPercentage: number; tourTags: string[] } => t !== null)
      .filter((t) => t.matchPercentage >= 30)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    logger.info(`[MatchingHelpers] Found ${scoredTours.length} tours with >30% match`);

    const recommendations: TourRecommendation[] = scoredTours
      .slice(0, 5)
      .map(({ tour, matchPercentage, tourTags }) => ({
        tourId: tour.id,
        tourName: tour.title,
        operator: tour.operator?.name || 'Unknown Operator',
        matchPercentage,
        whyItFits: generateMatchReasons(
          userTags.map((ut) => ({
            tagKey: ut.tagKey,
            importance: ut.importance,
          })),
          tourTags,
        ),
        highlights: extractHighlights(tour),
        practicalDetails: {
          duration: `${tour.durationInDays} days`,
          priceRange: 'Contact for pricing',
          region: tour.country?.name || tour.location || 'Multiple regions',
        },
      }));

    return recommendations;
  } catch (error) {
    logger.error('[MatchingHelpers] Error finding tours:', error);
    return [];
  }
}
