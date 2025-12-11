export const PERSONA_PREFIX = 'persona:' as const;

export const PERSONA_RULES = {
  couple: ['honeymoon', 'couple', 'romantic'],
  solo: ['solo'],
  family: ['family', 'children', 'kids'],
  friends: ['friends', 'group'],
} as const;

export const PERSONA_TAGS = {
  couple: 'persona:couple',
  solo: 'persona:solo',
  family: 'persona:family',
  friends: 'persona:friends',
} as const;
