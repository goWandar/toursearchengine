import { PERSONA_TAGS, PERSONA_RULES } from '../matching/rules/persona.rules.js';

export function inferPersonaTagsFromContent(content: string): string[] {
  const tags: string[] = [];

  const hasHoneymoon = content.includes('honeymoon');
  const hasCouple = PERSONA_RULES.couple.some((kw) => content.includes(kw));
  const hasSolo = PERSONA_RULES.solo.some((kw) => content.includes(kw));
  const hasFamily = PERSONA_RULES.family.some((kw) => content.includes(kw));
  const hasFriends = PERSONA_RULES.friends.some((kw) => content.includes(kw));

  // RULE 1: Honeymoon overrides everything → strict couple-only
  if (hasHoneymoon) {
    return [PERSONA_TAGS.couple];
  }

  // RULE 2: Couple is "soft" – can mix with others
  if (hasCouple) {
    tags.push(PERSONA_TAGS.couple);
  }

  // RULE 3: Others mix normally
  if (hasSolo) tags.push(PERSONA_TAGS.solo);
  if (hasFamily) tags.push(PERSONA_TAGS.family);
  if (hasFriends) tags.push(PERSONA_TAGS.friends);

  return [...new Set(tags)];
}
