import { getWeightedImportance } from './rules/weighting.rules.js';

// ================================
// MATCHING ALGORITHM
// ================================
export function calculateTourMatch(
  userTags: Array<{ tagKey: string; importance: number }>,
  tourTags: string[],
): number {
  let matchedScore = 0;
  let totalPossibleScore = 0;

  for (const userTag of userTags) {
    const weighted = getWeightedImportance(userTag.tagKey, userTag.importance);
    totalPossibleScore += weighted;

    if (tourTags.includes(userTag.tagKey)) {
      matchedScore += weighted;
    }
  }

  const score = totalPossibleScore > 0 ? (matchedScore / totalPossibleScore) * 100 : 0;

  return Math.round(score);
}

// ================================
// WHY IT FITS
// ================================
export function generateMatchReasons(
  userTags: { tagKey: string; importance: number }[],
  tourTags: string[],
): string[] {
  return userTags
    .filter((t) => t.importance >= 4 && tourTags.includes(t.tagKey))
    .map((t) => {
      const [, value] = t.tagKey.split(':');
      return `Matches your ${value.replace(/-/g, ' ')} preference`;
    })
    .filter((reason, idx, arr) => arr.indexOf(reason) === idx) // dedupe
    .slice(0, 3);
}

// ================================
// HIGHLIGHTS
// ================================
export function extractHighlights(tour: any): string[] {
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
