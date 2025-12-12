import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type TagKey =
  | 'duration:short'
  | 'duration:standard'
  | 'duration:extended'
  | 'duration:comprehensive'
  | 'accommodation:tented-camp'
  | 'accommodation:lodge'
  | 'accommodation:villa'
  | 'accommodation:mobile-camp'
  | 'region:east-africa'
  | 'region:southern-africa'
  | 'region:central-africa'
  | 'interest:wildlife'
  | 'wildlife:big5'
  | 'wildlife:migration'
  | 'style:adventurous'
  | 'style:relaxed'
  | 'persona:solo'
  | 'persona:couple'
  | 'persona:family'
  | 'persona:friends'
  | 'activity:walking-safari'
  | 'activity:game-drives'
  | 'activity:cultural-visit'
  | 'activity:photography-tour'
  | 'activity:balloon'
  | 'activity:boat'
  | 'interest:culture'
  | 'interest:photography'
  | 'interest:conservation'
  | 'interest:beach'
  | 'budget:economy'
  | 'budget:standard'
  | 'budget:midrange'
  | 'budget:luxury'
  | 'budget:ultra-luxury'
  | 'pace:slow'
  | 'pace:moderate'
  | 'pace:packed';

type TourWithRelations = Prisma.TourGetPayload<{
  include: { country: true };
}>;

// ---------- CONFIG SECTION ----------

interface DurationRule {
  maxDays: number;
  tag: TagKey;
}

// TODO:
// Adjust duration rules as needed
const DURATION_RULES: DurationRule[] = [
  { maxDays: 5, tag: 'duration:short' },
  { maxDays: 8, tag: 'duration:standard' },
  { maxDays: 14, tag: 'duration:extended' },
  { maxDays: Number.POSITIVE_INFINITY, tag: 'duration:comprehensive' },
];

interface AccommodationRule {
  patterns: string[];
  tag: TagKey;
}

const ACCOMMODATION_RULES: AccommodationRule[] = [
  { patterns: ['tent', 'camp'], tag: 'accommodation:tented-camp' },
  { patterns: ['lodge'], tag: 'accommodation:lodge' },
  { patterns: ['villa', 'private'], tag: 'accommodation:villa' },
  { patterns: ['mobile'], tag: 'accommodation:mobile-camp' },
];

interface RegionRule {
  tag: TagKey;
  countries: string[];
}

const REGION_RULES: RegionRule[] = [
  { tag: 'region:east-africa', countries: ['tanzania', 'kenya'] },
  { tag: 'region:southern-africa', countries: ['south africa', 'botswana', 'namibia', 'zimbabwe'] },
  { tag: 'region:central-africa', countries: ['rwanda', 'uganda', 'congo'] },
];

interface KeywordRule {
  tag: TagKey;
  keywordsAny: string[];
}

const KEYWORD_RULES: KeywordRule[] = [
  { tag: 'interest:wildlife', keywordsAny: ['wildlife', 'game drive', 'safari', 'big five'] },
  { tag: 'wildlife:big5', keywordsAny: ['big five', 'big 5'] },
  { tag: 'wildlife:migration', keywordsAny: ['migration', 'wildebeest'] },
  { tag: 'style:adventurous', keywordsAny: ['adventure', 'walking', 'hiking', 'active'] },
  { tag: 'style:relaxed', keywordsAny: ['relax', 'leisure', 'peaceful'] },
  { tag: 'persona:solo', keywordsAny: ['solo'] },
  { tag: 'persona:couple', keywordsAny: ['couple', 'romantic', 'honeymoon'] },
  { tag: 'persona:family', keywordsAny: ['family', 'children', 'kids'] },
  { tag: 'persona:friends', keywordsAny: ['friends', 'group'] },
  { tag: 'activity:walking-safari', keywordsAny: ['walking safari', 'bush walk'] },
  { tag: 'activity:game-drives', keywordsAny: ['game drive'] },
  { tag: 'activity:cultural-visit', keywordsAny: ['culture', 'village', 'maasai', 'local'] },
  { tag: 'activity:photography-tour', keywordsAny: ['photo', 'photography'] },
  { tag: 'activity:balloon', keywordsAny: ['balloon'] },
  { tag: 'activity:boat', keywordsAny: ['boat', 'mokoro', 'canoe'] },
  { tag: 'interest:culture', keywordsAny: ['culture', 'village', 'maasai'] },
  { tag: 'interest:photography', keywordsAny: ['photo', 'photography'] },
  { tag: 'interest:conservation', keywordsAny: ['conservation', 'protect', 'sustainable'] },
  { tag: 'interest:beach', keywordsAny: ['beach', 'zanzibar', 'coast'] },
  { tag: 'budget:economy', keywordsAny: ['budget', 'affordable', 'economy'] },
  { tag: 'budget:standard', keywordsAny: ['comfort', 'standard'] },
  { tag: 'budget:luxury', keywordsAny: ['luxury', 'premium', 'exclusive', 'high-end'] },
  { tag: 'budget:ultra-luxury', keywordsAny: ['ultra'] },
  { tag: 'pace:packed', keywordsAny: ['action', 'packed', 'intensive'] },
  { tag: 'pace:slow', keywordsAny: ['leisure', 'slow', 'relaxed'] },
];

// Budget default rule
const DEFAULT_BUDGET_TAG: TagKey = 'budget:midrange';
const DEFAULT_PACE_TAG: TagKey = 'pace:moderate';

const ALL_TAG_KEYS: TagKey[] = Array.from(
  new Set<TagKey>([
    ...DURATION_RULES.map((r) => r.tag),
    ...ACCOMMODATION_RULES.map((r) => r.tag),
    ...REGION_RULES.map((r) => r.tag),
    ...KEYWORD_RULES.map((r) => r.tag),
    DEFAULT_BUDGET_TAG,
    DEFAULT_PACE_TAG,
  ]),
);

// ---------- UTILITY FUNCTIONS ----------

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').toLowerCase();
}

function buildContentBlob(tour: TourWithRelations): string {
  const parts = [tour.title, tour.description, tour.itinerary];
  return normalizeText(parts.filter(Boolean).join(' '));
}

function getCountryName(tour: TourWithRelations): string {
  const countryName = tour.country?.name ?? tour.location ?? '';
  return normalizeText(countryName);
}

// ---------- TAGGING LOGIC ----------

function getDurationTag(tour: TourWithRelations): TagKey {
  const days = tour.durationInDays ?? 0;
  const rule = DURATION_RULES.find((r) => days <= r.maxDays);
  return rule?.tag ?? 'duration:comprehensive';
}

function getAccommodationTags(tour: TourWithRelations): TagKey[] {
  const accommodation = normalizeText(tour.accommodationType);
  if (!accommodation) return [];

  for (const rule of ACCOMMODATION_RULES) {
    if (rule.patterns.some((p) => accommodation.includes(p))) {
      return [rule.tag];
    }
  }
  return [];
}

function getRegionTags(tour: TourWithRelations): TagKey[] {
  const countryName = getCountryName(tour);
  if (!countryName) return [];

  for (const rule of REGION_RULES) {
    if (rule.countries.some((c) => countryName.includes(c))) {
      return [rule.tag];
    }
  }
  return [];
}

function getKeywordTags(tour: TourWithRelations): TagKey[] {
  const content = buildContentBlob(tour);
  if (!content) return [];

  const tags: TagKey[] = [];
  for (const rule of KEYWORD_RULES) {
    if (rule.keywordsAny.some((kw) => content.includes(kw))) {
      tags.push(rule.tag);
    }
  }
  return tags;
}

function getBudgetTag(tour: TourWithRelations): TagKey {
  const content = buildContentBlob(tour);

  // Check budget keywords
  for (const rule of KEYWORD_RULES) {
    if (rule.tag.startsWith('budget:') && rule.keywordsAny.some((kw) => content.includes(kw))) {
      return rule.tag;
    }
  }

  return DEFAULT_BUDGET_TAG;
}

function getPaceTag(tour: TourWithRelations): TagKey {
  const content = buildContentBlob(tour);

  // Check pace keywords
  for (const rule of KEYWORD_RULES) {
    if (rule.tag.startsWith('pace:') && rule.keywordsAny.some((kw) => content.includes(kw))) {
      return rule.tag;
    }
  }

  return DEFAULT_PACE_TAG;
}

function getAllTagsForTour(tour: TourWithRelations): TagKey[] {
  const tags = new Set<TagKey>();

  tags.add(getDurationTag(tour));
  tags.add(getBudgetTag(tour));
  tags.add(getPaceTag(tour));

  for (const tag of getAccommodationTags(tour)) tags.add(tag);
  for (const tag of getRegionTags(tour)) tags.add(tag);
  for (const tag of getKeywordTags(tour)) tags.add(tag);

  return Array.from(tags);
}

// Resolve conflicts in persona tags
function resolvePersonaConflicts(tagKeys: TagKey[]): TagKey[] {
  const personaTags = tagKeys.filter((t) => t.startsWith('persona:'));
  const otherTags = tagKeys.filter((t) => !t.startsWith('persona:'));

  const hasSolo = personaTags.includes('persona:solo');
  const hasCouple = personaTags.includes('persona:couple');

  // Conflict detected: Solo + Couple
  if (hasSolo && hasCouple) {
    console.warn(
      '[AutoTag] Conflict: Both solo and couple tags detected. ' +
        'Removing solo (couple has priority for honeymoon tours).',
    );

    // Remove solo, keep couple
    const resolvedPersonaTags = personaTags.filter((t) => t !== 'persona:solo');
    return [...otherTags, ...resolvedPersonaTags];
  }

  // No conflict, return all tags unchanged
  return tagKeys;
}

// ---------- CATEGORY CACHE  ----------

class CategoryCache {
  private map = new Map<TagKey, number>();

  constructor(private readonly prismaClient: PrismaClient) {}

  async warm(): Promise<void> {
    const tags = await this.prismaClient.tag.findMany({
      where: {
        key: { in: ALL_TAG_KEYS },
      },
      select: {
        key: true,
        categoryId: true,
      },
    });

    for (const tag of tags) {
      const key = tag.key as TagKey;
      if (ALL_TAG_KEYS.includes(key)) {
        this.map.set(key, tag.categoryId);
      }
    }

    const missing = ALL_TAG_KEYS.filter((k) => !this.map.has(k));
    if (missing.length > 0) {
      console.warn('[AutoTag] WARNING: missing tags:', missing.join(', '));
    }
  }

  getIdOrNull(key: TagKey): number | null {
    return this.map.get(key) ?? null;
  }
}

// ---------- MAIN SCRIPT ----------

export async function autoTagTours(): Promise<void> {
  console.log('[AutoTag] Starting auto-tag process...');

  const categoryCache = new CategoryCache(prisma);
  await categoryCache.warm();

  const tours = await prisma.tour.findMany({
    where: { archived: false },
    include: { country: true },
  });

  console.log(`[AutoTag] Found ${tours.length} active tours`);

  const assignments: {
    tourId: number;
    tourUniqueId: string;
    categoryId: number;
    weight: number;
  }[] = [];
  let toursWithTags = 0;

  for (const tour of tours) {
    const tagKeys = getAllTagsForTour(tour);
    const resolvedTagKeys = resolvePersonaConflicts(tagKeys);

    const categoryIds: number[] = [];
    for (const key of resolvedTagKeys) {
      const categoryId = categoryCache.getIdOrNull(key);
      if (!categoryId) {
        console.warn(`[AutoTag] Tour ${tour.id}: skipped tag "${key}" – category not found`);
        continue;
      }
      categoryIds.push(categoryId);
    }

    const uniqueCategoryIds = Array.from(new Set(categoryIds));

    if (uniqueCategoryIds.length === 0) {
      console.log(`[AutoTag] Tour ${tour.id}: no categories resolved, skipping`);
      continue;
    }

    toursWithTags += 1;

    for (const categoryId of uniqueCategoryIds) {
      // TODO: [TECH-DEBT] Refactor to use direct tour-tag relationships
      // Current: Stores categoryId, which links tour to ALL tags in that category
      // Problem: Honeymoon tours get ALL persona tags (solo, couple, family, friends)
      // Desired: Store specific tagId to link tour to exact tags only
      //
      // Short-term workaround: Matching logic filters persona tags by keywords
      // Long-term fix: Add tour_tags table and store tagId instead of categoryId
      //
      // Related:
      // - matching.helpers.ts has workaround filtering logic
      // - See GitHub issue #178 for migration plan
      assignments.push({
        tourId: tour.id,
        tourUniqueId: tour.uniqueId,
        categoryId,
        weight: 1.0,
      });
    }

    console.log(
      `[AutoTag] ✓ Tour ${tour.id} "${tour.title}": ${resolvedTagKeys.join(', ')} (${uniqueCategoryIds.length} categories)`,
    );
  }

  if (assignments.length === 0) {
    console.log('[AutoTag] No category assignments to write. Done.');
    return;
  }

  const result = await prisma.tourCategory.createMany({
    data: assignments,
    skipDuplicates: true,
  });

  console.log('\n================================================================================');
  console.log('                        AUTO-TAG SUMMARY');
  console.log('================================================================================');
  console.log(`Total tours processed: ${tours.length}`);
  console.log(`Tours successfully tagged: ${toursWithTags}`);
  console.log(`Total categories assigned: ${result.count}`);
  console.log(`Average categories per tour: ${(result.count / toursWithTags || 0).toFixed(1)}`);
  console.log('================================================================================\n');
}

autoTagTours()
  .then(() => {
    console.log('[AutoTag] Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[AutoTag] Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
