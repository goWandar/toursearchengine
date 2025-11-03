// add persona pre-defined safari traveler archetype that matches certain tag combinations.

import { prisma } from '../../../db/prisma.js';
import type { QuizPersona, Tag } from '@prisma/client';

import { logger } from '../../../utils/logger.js';

interface Persona {
  id: number;
  name: string;
  description: string;
  keyTraits: string[];
  tagMapping: string[];
  imageUrl?: string;
}

// Hard-coded personas for testing (mirror DB structure)
const mockPersonas: Persona[] = [
  {
    id: 1,
    name: 'The Adventurous Solo Traveler',
    description:
      'Independent and fearless, you seek remote destinations and thrilling encounters with nature.',
    keyTraits: ['Solo', 'Adventurous', 'Wildlife'],
    tagMapping: ['persona:solo', 'style:adventurous', 'interest:wildlife'],
    imageUrl: '/images/personas/adventurous-solo.jpg',
  },
  {
    id: 2,
    name: 'The Relaxed Couple',
    description: 'You value comfort, privacy, and romantic moments surrounded by natural beauty.',
    keyTraits: ['Couple', 'Relaxed', 'Luxury'],
    tagMapping: ['persona:couple', 'style:relaxed', 'budget:luxury'],
    imageUrl: '/images/personas/relaxed-couple.jpg',
  },
  {
    id: 3,
    name: 'The Family Explorer',
    description:
      'Curious and caring, you want to share discovery and learning with your loved ones.',
    keyTraits: ['Family', 'Educational', 'Culture'],
    tagMapping: ['persona:family', 'style:educational', 'interest:culture'],
    imageUrl: '/images/personas/family-explorer.jpg',
  },
  {
    id: 4,
    name: 'The Friends Expedition',
    description:
      'You thrive on shared adventures and laughter, enjoying social experiences and group travel.',
    keyTraits: ['Friends', 'Adventurous', 'Social'],
    tagMapping: ['persona:friends', 'style:adventurous', 'crowd:social'],
    imageUrl: '/images/personas/friends-expedition.jpg',
  },
];

// QuizOption → Tags → Persona
export async function determinePersona(
  userTags: Array<{ tagKey: string }>,
): Promise<Persona | null> {
  // Persona generation logic here
  logger.info('[QuizHelpers] Matching persona from mock data');

  const tagKeys = userTags.map((t) => t.tagKey);

  let bestMatch: { persona: Persona; score: number } | null = null;

  for (const persona of mockPersonas) {
    const overlap = persona.tagMapping.filter((tag) => tagKeys.includes(tag)).length;

    if (!bestMatch || overlap > bestMatch.score) {
      bestMatch = { persona, score: overlap };
    }
  }

  if (bestMatch) {
    logger.success(
      `[QuizHelpers] Matched persona: ${bestMatch.persona.name} (score ${bestMatch.score})`,
    );
    return bestMatch.persona;
  }

  logger.warn('[QuizHelpers] No persona match found.');
  return null;

  // const personaTags: QuizPersona[] = await prisma.quizPersona.findMany();

  // // Find personas that match the provided tags
  // let bestMatch: { id: number; matchScore: number } | null = null;

  // for (const persona of personaTags) {
  //   const overlap = persona.tagMapping.filter((tag) => tagKeys.includes(tag)).length;

  //   if (!bestMatch || overlap > bestMatch.matchScore) {
  //     bestMatch = { id: persona.id, matchScore: overlap };
  //   }
  // }

  // return bestMatch ? bestMatch.id : null;
}
