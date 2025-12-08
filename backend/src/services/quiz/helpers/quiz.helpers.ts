import { prisma } from '../../../db/prisma.js';
import { logger } from '../../../utils/logger.js';

import type { QuizSubmissionRequest, QuizResults, UserProfile } from '../../../types/quiz.types.js';

import { determinePersona } from './persona.helpers.js';
import { findMatchingTours } from './matching.helpers.js';

// Generate complete quiz results
export async function generateQuizResults(
  submission: QuizSubmissionRequest,
): Promise<{ results: QuizResults; personaId: number | null }> {
  logger.info('[QuizHelpers] Generating quiz results');

  try {
    // Step 1: Get tag details
    const userTags = await getUserTags(submission);

    // Step 2: Match persona
    const matchedPersona = await determinePersona(userTags);

    // Step 3: Generate user profile
    const userProfile = generateUserProfile(userTags, matchedPersona);

    // Step 4: Find matching tours
    const recommendations = await findMatchingTours(userTags);

    // Step 5: Generate next steps
    const nextSteps = generateNextSteps(recommendations);

    logger.success('[QuizHelpers] Quiz results generated successfully');

    return {
      results: {
        userProfile,
        recommendations,
        nextSteps,
      },
      personaId: matchedPersona?.id || null,
    };
  } catch (error) {
    logger.error('[QuizHelpers] Error generating results:', error);
    throw error;
  }
}

// Get user tags from answers
async function getUserTags(submission: QuizSubmissionRequest) {
  const tagIds = submission.answers.map((a) => a.tagId);

  const tags = await prisma.tag.findMany({
    where: { id: { in: tagIds } },
    include: {
      category: { select: { name: true } },
    },
  });

  return submission.answers.map((answer) => {
    const tag = tags.find((t) => t.id === answer.tagId);
    return {
      tagId: answer.tagId,
      tagKey: tag?.key || '',
      tagLabel: tag?.label || '',
      categoryName: tag?.category.name || '',
      importance: answer.importance,
    };
  });
}

// Generate user profile
function generateUserProfile(userTags: any[], matchedPersona: any): UserProfile {
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
function generateDynamicPersonaName(userTags: any[]): string {
  const personaTag = userTags.find((t) => t.categoryName === 'persona');
  const styleTag = userTags.find((t) => t.categoryName === 'style');

  if (personaTag && styleTag) {
    return `The ${styleTag.tagLabel} ${personaTag.tagLabel}`;
  } else if (styleTag) {
    return `The ${styleTag.tagLabel} Traveler`;
  }

  return 'The Safari Explorer';
}

// Generate next steps
function generateNextSteps(recommendations: any[]): string[] {
  if (recommendations.length === 0) {
    return [
      "We're preparing your personalized recommendations",
      'Browse all available safari tours',
      'Contact our experts for assistance',
    ];
  }

  return [
    'Review your personalized tour recommendations',
    'Compare tour details and itineraries',
    'Contact operators to check availability',
  ];
}
