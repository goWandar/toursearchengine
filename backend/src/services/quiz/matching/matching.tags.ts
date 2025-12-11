import type { TourWithCategories } from '../../../types/quiz.types.js';
import { PERSONA_PREFIX } from '../matching/rules/persona.rules.js';
import { inferPersonaTagsFromContent } from '../persona/persona.inference.js';

import { normalizeText } from '../../../utils/text.utils.js';

// -----------------------------------------------------------------------------------
// Extract relevant tags (persona tags filtered by title/description)
// -----------------------------------------------------------------------------------
export function getRelevantTourTags(tour: TourWithCategories): string[] {
  const allTags = tour.tourCategories.flatMap((tc) => tc.category.tags.map((tag) => tag.key));

  const personaTags = allTags.filter((key) => key.startsWith(PERSONA_PREFIX));
  const nonPersonaTags = allTags.filter((key) => !key.startsWith(PERSONA_PREFIX));

  // No persona category → return everything
  if (personaTags.length === 0) {
    return [...new Set(allTags)];
  }

  const content = normalizeText(`${tour.title} ${tour.description ?? ''}`);

  const inferred = inferPersonaTagsFromContent(content);

  // If no persona keywords → remove persona tags entirely
  if (inferred.length === 0) {
    return [...new Set(nonPersonaTags)];
  }

  // Merge non-persona tags with inferred persona tags
  return [...new Set([...nonPersonaTags, ...inferred])];
}
