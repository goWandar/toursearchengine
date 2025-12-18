// Extract category prefix from tagKey (e.g. "style:adventurous" → "style")
export function getCategoryPrefix(tagKey: string): string {
  const [prefix] = tagKey.split(':');
  return prefix ?? 'default';
}

// ================================
// POSITIVE WEIGHTING RULES
// ================================

export const CATEGORY_WEIGHTS = {
  persona: 1.6,
  style: 1.4,
  interest: 1.3,
  activity: 1.3,
  duration: 1.15,
  budget: 1.15,
  pace: 1.15,
  region: 1.15,
  default: 1.0,
};

export const HIGH_IMPORTANCE_BOOST = 1.15;

// ================================
// NEGATIVE WEIGHTING RULES
// ================================

export const NEGATIVE_WEIGHTS = {
  strong: 1.5, // big penalty
  medium: 1.2, // moderate penalty
  soft: 0.6, // small penalty
};

// ================================
// CATEGORY WEIGHTING FOR SCORING
// ================================

/**
 * Category-level weights:
 * - persona: strongest signal
 * - style: strong
 * - interest/activity: medium-strong
 * - duration/budget/pace/region: medium
 * - everything else: neutral
 *
 * High-importance tags (importance >= 4) are boosted slightly.
 */
export function getWeightedImportance(tagKey: string, importance: number): number {
  const prefix = getCategoryPrefix(tagKey);

  let baseFactor = 1.0;
  switch (prefix) {
    case 'persona':
      baseFactor = 1.6;
      break;
    case 'style':
      baseFactor = 1.4;
      break;
    case 'interest':
    case 'activity':
      baseFactor = 1.3;
      break;
    case 'duration':
    case 'budget':
    case 'pace':
    case 'region':
      baseFactor = 1.15;
      break;
    default:
      baseFactor = 1.0;
  }

  const importanceBoost = importance >= 4 ? 1.15 : 1.0; // extra weight for "important" tags

  return importance * baseFactor * importanceBoost;
}
