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
