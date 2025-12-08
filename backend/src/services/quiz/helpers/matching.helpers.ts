import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

import type { TourRecommendation } from '../../../types/quiz.types.js';

// Calculate match percentage between user tags and tour tags
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

  const matchPercentage = totalPossibleScore > 0 ? (matchedScore / totalPossibleScore) * 100 : 0;

  return Math.round(matchPercentage);
}

// Find matching tours based on user tags
export async function findMatchingTours(
  userTags: Array<{
    tagId: number;
    tagKey: string;
    importance: number;
  }>,
): Promise<TourRecommendation[]> {
  logger.info('[MatchingHelpers] Finding matching tours');

  try {
    // Get all active tours with their categories and tags
    const tours = await prisma.tour.findMany({
      where: {
        archived: false,
      },
      include: {
        tourCategories: {
          include: {
            category: {
              include: {
                tags: true,
              },
            },
          },
        },
        operator: true,
        country: true,
      },
      take: 100, // Limit for performance
    });

    logger.info(`[MatchingHelpers] Found ${tours.length} tours to match against`);

    // Calculate match for each tour
    const scoredTours = tours
      .map((tour) => {
        // Extract all tag keys from tour's categories
        const tourTags = tour.tourCategories
          .flatMap((tc) => tc.category.tags)
          .map((tag) => tag.key);

        // Calculate match percentage
        const matchPercentage = calculateTourMatch(
          userTags.map((ut) => ({ tagKey: ut.tagKey, importance: ut.importance })),
          tourTags,
        );

        return {
          tour,
          matchPercentage,
          tourTags,
        };
      })
      .filter(({ matchPercentage }) => matchPercentage >= 30) // Minimum 30% match
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5); // Top 5

    logger.info(`[MatchingHelpers] Found ${scoredTours.length} tours with >30% match`);

    // Format as recommendations
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

// Generate "why it fits" reasons
function generateMatchReasons(
  userTags: Array<{ tagKey: string; importance: number }>,
  tourTags: string[],
): string[] {
  const reasons: string[] = [];

  for (const userTag of userTags) {
    if (userTag.importance >= 4 && tourTags.includes(userTag.tagKey)) {
      const [category, value] = userTag.tagKey.split(':');
      reasons.push(`Matches your ${value?.replace(/-/g, ' ')} preference`);
    }
  }

  return reasons.slice(0, 3); // Top 3 reasons
}

// Extract tour highlights
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
