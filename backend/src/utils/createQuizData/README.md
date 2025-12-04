# Seed Scripts

This directory contains all seed scripts and data files required to populate categories, personas, tags, and quiz content in the database.
Each script can be executed independently, and all data lives inside the data/ folder for maintainability and modular updates.

## Quick Start

Navigate to the seed scripts directory:

```bash
cd src/utils/createQuizData
```

```bash
# Run all seeds in order
npx tsx addCategories.ts && \
npx tsx addTags.ts && \
npx tsx addQuizData.ts && \
npx tsx addPersonas.ts
```

Or run individually (see Usage section below).

## File Structure

```bash
createQuizData
├── README.md                       # Instructions for running seed scripts (This file)
├── addCategories.ts                # Seeds categories and conflict groups
├── addTags.ts                      # Seeds all tags linked to categories
├── addQuizData.ts                  # Seeds quiz stages, questions, options, and insights
├── addPersonas.ts                  # Seeds quiz personas (NEW)
└── data/
    ├── quizCategories.ts
    ├── quizPersonas.ts             # Persona definitions (NEW)
    ├── quizQuestions.ts
    └── quizTags.ts
```

## Data Organization

**Separated Data Files:**

Data Files are in `data/` folder. These files contain the structured seed data used by the scripts. They allow updating quiz/tour data without modifying logic.

- `quizCategories.ts` List of category objects used in addCategories.ts, including optional conflictGroupName fields.
- `quizPersonas.ts` Persona definitions used in addPersonas.ts (pre-defined safari traveler archetypes).
- `quizQuestions.ts` All quiz questions, answer options, and metadata used by addQuizData.ts.
- `quizTags.ts` Tag definitions used in addTags.ts.

## Prerequisites

1. **Database Setup**: Ensure your database is running and migrations are applied
2. **Environment Variables**: Configure `.env` with `DATABASE_URL` and `DIRECT_URL`
3. **Dependencies**: Install required packages:

```bash
   npm install @prisma/client
   npm install -D tsx
```

## Usage

### Seed Individual Files

You must run the scripts in the following order:

```bash
# Step 1: Seed categories first
npx tsx addCategories.ts

# Step 2: Seed tags (requires categories to exist)
npx tsx addTags.ts

# Step 3: Seed quiz data (requires categories to exist)
npx tsx addQuizData.ts

# Step 4: Seed personas (independent, can run anytime)
npx tsx addPersonas.ts
```

**Important**: Categories must be seeded first as Tags and Quiz Data depend on existing category records.

## Expected Results

### Successful Seed Should Show

```bash
================================================================================
                          FINAL SEED SUMMARY
================================================================================

 CATEGORIES:
    Successfully seeded: 12/12
    Failed: 0

 TAGS:
    Successfully seeded: 85/85
    Failed: 0

 QUIZ DATA:
    Quiz Stages: 3/3
    Questions: 17/17
    Options: 68/68
    Insights: 68/68
    Failed: 0

 PERSONAS:
    Successfully seeded: 8/8
    Failed: 0

 OVERALL STATISTICS:
   Total records seeded: 261
   Total successful: 261
   Total failures: 0
   Success rate: 100.0%
================================================================================
 All records seeded successfully!
================================================================================
```

### Partial Success Should Show

```bash
 OVERALL STATISTICS:
   Total records seeded: 261
   Total successful: 253
   Total failures: 8
   Success rate: 96.9%
================================================================================
 Seeding completed with some failures. Check the details above.
================================================================================
```

## Seed Data Details

### Step 1: Categories & Conflict Groups

Seeds the foundational category system including:

**Conflict Groups:**

- Travel Style (prevents mixing incompatible travel styles)
- Group Size (ensures group size exclusivity)

**Categories:**

- Adventure, Relaxed, Family, Luxury, Budget, Romantic
- Wildlife, Photography, Migration, Culture
- Small Groups (2-8 people), Large Groups (9+ people)

**Expected Output:**

```bash
Adding/Updating Mock Categories & Conflict Groups...
12 categories upserted
```

### Step 2: Tags

Seeds all tags organized by category:

**Tag Categories:**

- **Persona**: solo, couple, family, friends
- **Style**: relaxed, adventurous, educational, wildlife-focused
- **Experience**: first-time, some, experienced, expert
- **Budget**: budget, midrange, luxury, ultra-luxury
- **Interest**: wildlife, photography, culture, relaxation, conservation
- **Wildlife**: big5, migration, elephants, rhinos, chimps, predators
- **Duration**: short (3-5 days), standard (6-8 days), extended (9-14 days), comprehensive (15+ days)
- **Pace**: slow, moderate, packed, flexible
- **Accommodation**: camping, tented-camp, lodge, luxury-camp
- **Activity**: game-drives, walking-safaris, cultural-visits, photography, balloon, boat
- **Region**: east-africa, southern-africa, central-africa, multiple
- **Country**: kenya, south-africa, tanzania, botswana
- **Season**: jan-mar, apr-jun, jul-sep, oct-dec
- **Crowd Preference**: avoid, dontmind, enjoy, social
- **Timing Priority**: wildlife, weather, photography, value
- **Weather Tolerance**: rain-ok, some-rain, dry-only, sunshine-only
- **Planning Flexibility**: fixed, somewhat, very, completely

**Expected Output:**

```bash
Seeding tags...
85 tags seeded successfully
```

### Step 3: Quiz Data

Seeds the complete quiz system including:

**Quiz Stages:**

- **Exploring**: Understand safari personality and preferences
- **Narrowing**: Refine region, budget, and activity preferences
- **Timing**: Pick the right time for safari

**Questions per Stage:**

- **Exploring** (6 questions): tripType, vibe, experience, comfort, priorities, duration
- **Narrowing** (6 questions): region, budget, pace, accommodation, activities, duration
- **Timing** (5 questions): travelMonth, flexibility, crowds, priority, weather

**Expected Output:**

```bash
Seeding Smart Quiz Data...
Quiz stages ensured
Questions, Options, and Nudges seeded
Smart Quiz Data Seeded Successfully
```

### Step 4: Personas (NEW)

Seeds pre-defined safari traveler archetypes that match certain tag combinations.

**Personas:**

- **The Adventurous Solo Traveler**: Independent, fearless, seeks remote destinations
- **The Relaxed Couple**: Values comfort, privacy, and romantic moments
- **The Family Explorer**: Educational experiences for all ages
- **The Friends Expedition**: Shared adventures and social experiences
- **The Wildlife Photographer**: Lives for the perfect shot
- **The Luxury Connoisseur**: Ultra-luxury lodges and exclusive experiences
- **The Cultural Immersion Seeker**: Connects with local communities
- **The Budget-Conscious Explorer**: Authentic experiences at affordable prices

**Persona Matching:**
Each persona has a `tagMapping` array that defines which user tag selections match that archetype. When a user takes the quiz, their selected tags are compared against each persona's tag mapping to find the best match.

**Expected Output:**

```bash
[SeedPersonas] Starting persona seeding
[SeedPersonas] Creating persona "The Adventurous Solo Traveler"...
[SeedPersonas] Creating persona "The Relaxed Couple"...
[SeedPersonas] Creating persona "The Family Explorer"...
[SeedPersonas] Creating persona "The Friends Expedition"...
[SeedPersonas] Creating persona "The Wildlife Photographer"...
[SeedPersonas] Creating persona "The Luxury Connoisseur"...
[SeedPersonas] Creating persona "The Cultural Immersion Seeker"...
[SeedPersonas] Creating persona "The Budget-Conscious Explorer"...
[SeedPersonas] Successfully seeded 8 personas
```

## Handling Failures

When seeding, failed entries are logged with detailed reasons:

```bash
=== STEP 1: Seeding Categories ===
Skipping category Adventure: Already exists

=== STEP 2: Seeding Tags ===
Error creating tag persona:solo: Category not found: persona

=== STEP 3: Seeding Quiz Data ===
QuizStage not found: Exploring

=== STEP 4: Seeding Personas ===
Error creating persona: Duplicate name
```

### Failure Reasons

- **Exists** – The record already exists in the database (skipped during upsert)
- **NotFound** – Referenced category or stage doesn't exist
- **Invalid** – Missing required fields or validation error
- **Unexpected** – Any other unhandled error

After reviewing the logs, you can:

1. Fix the failed records in the seed files
2. Rerun the script — existing entries will be updated via `upsert`

## Features

### Data Validation

- **Type safety**: Full TypeScript support with Prisma-generated types
- **Upsert logic**: Prevents duplicates while allowing updates
- **Foreign key validation**: Ensures tags link to existing categories
- **Relationship integrity**: Validates quiz options link to valid categories
- **Persona matching**: Validates tag mappings exist in the database

### Error Handling

- **Row-level errors**: Continues processing if individual records fail
- **Detailed logging**: Shows exactly which records failed and why
- **Progress tracking**: Displays success/error counts per section
- **Graceful disconnection**: Ensures database connections close properly

### Idempotent Operations

- **Safe re-runs**: Can run scripts multiple times without creating duplicates
- **Update on conflict**: Existing records are updated with new data
- **Preserves relationships**: Maintains foreign key connections on updates

## Troubleshooting

### Common Issues

1. **Category Not Found Error**

```bash
   Error: Category not found: persona
```

**Solution**: Ensure `addCategories.ts` runs before `addTags.ts`

2. **QuizStage Not Found**

```bash
   QuizStage not found: Exploring
```

**Solution**: Check that quiz stages are created before questions

3. **Persona Duplicate Name**

```bash
   Error: Unique constraint failed on name
```

**Solution**: This is normal on re-runs; script will update existing persona

4. **High Skip Count**

```bash
   12 categories upserted (all skipped - already exist)
```

**Solution**: This is normal behavior on subsequent runs due to upsert logic

### Debugging Tips

- **Check execution order**: Categories → Tags → Quiz Data → Personas
- **Validate foreign keys**: Ensure referenced records exist
- **Review error messages**: Specific validation errors are logged
- **Test individual scripts**: Run one seed file at a time to isolate issues
- **Check database state**: Query tables to verify existing data

## Technical Details

### Dependencies

- **@prisma/client**: Database ORM with type-safe queries
- **tsx**: TypeScript execution for Node.js

### Data Flow

```bash
Seed Scripts → Prisma Upsert → Database
     ↓
  Validation
     ↓
Foreign Key Checks
     ↓
  Success/Error Logging
```

### Foreign Key Relationships

- `Tag.categoryId` → `Category.id`
- `QuizQuestion.stageId` → `QuizStage.id`
- `QuizOption.questionId` → `QuizQuestion.id`
- `QuizOption.categoryId` → `Category.id`
- `QuizInsight.questionId` → `QuizQuestion.id`
- `Category.conflictGroupId` → `ConflictGroup.id` (optional)
- `QuizResponse.personaId` → `QuizPersona.id` (optional)

## Best Practices

1. **Always backup database** before running seed scripts
2. **Run in correct order**: Categories → Tags → Quiz Data → Personas
3. **Monitor seed output** for data quality issues
4. **Test with sample data** first if modifying scripts
5. **Keep seed files in version control** for reproducibility
6. **Update personas** based on real user data patterns

## Re-seeding Data

To re-seed data:

1. **Clear existing data** (if needed):

```sql
   -- Clear quiz responses (if re-seeding personas)
   UPDATE "quiz_responses" SET "personaId" = NULL;

   -- Clear personas
   DELETE FROM "quiz_personas";

   -- Clear quiz data
   DELETE FROM "quiz_insights";
   DELETE FROM "quiz_options";
   DELETE FROM "quiz_questions";
   DELETE FROM "quiz_stages";

   -- Clear tags
   DELETE FROM "tags";

   -- Clear categories
   DELETE FROM "categories";
   DELETE FROM "conflict_groups";
```

2. **Reset sequences**:

```sql
   ALTER SEQUENCE "quiz_stages_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "quiz_questions_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "quiz_options_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "quiz_insights_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "quiz_personas_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "tags_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "categories_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "conflict_groups_id_seq" RESTART WITH 1;
```

3. **Run seed scripts** again:

```bash
   npx tsx addCategories.ts
   npx tsx addTags.ts
   npx tsx addQuizData.ts
   npx tsx addPersonas.ts
```

## Notes

- Scripts use **upsert** operations to prevent duplicates
- **Conflict groups** ensure certain categories are mutually exclusive
- **Quiz insights** provide contextual nudges for each quiz option
- **Personas** enable personalized user profiles based on quiz results
- All scripts include **cleanup handlers** to close database connections properly
- **Category-to-tag mapping** enables powerful filtering and recommendation logic
- **Persona tag mapping** allows automatic matching of user preferences to traveler archetypes

## Persona System Details

### How Personas Work

1. **User takes quiz** → Selects options with tags
2. **Tags collected** → e.g., `['persona:solo', 'style:adventurous', 'interest:wildlife']`
3. **Persona matching** → Compare against each persona's `tagMapping`
4. **Best match selected** → Persona with highest tag overlap
5. **Result displayed** → User sees their safari traveler archetype

### Persona Tag Mapping Example

```typescript
{
  name: 'The Adventurous Solo Traveler',
  tagMapping: [
    'persona:solo',
    'style:adventurous',
    'interest:wildlife',
    'activity:walking-safari',
    'pace:action-packed',
  ]
}
```

If a user selects 4 out of 5 of these tags, they match 80% with this persona.

### Adding New Personas

1. Edit `data/quizPersonas.ts`
2. Add new persona object with:
   - `name`: Unique persona name
   - `description`: What defines this traveler
   - `keyTraits`: Array of trait strings
   - `tagMapping`: Array of tag keys to match against
   - `imageUrl`: Optional image path
3. Run `npx tsx addPersonas.ts`

---

**Updated:** December 2024 - Added Personas seed script and documentation
