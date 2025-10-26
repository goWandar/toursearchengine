# Seed Scripts

This directory contains scripts used to seed foundational data for the quiz and categorization system into the database using Prisma.

## Quick Start

```bash
# Run all seeds in order
npx tsx createQuizData/addCategories.ts && \
npx tsx createQuizData/addTags.ts && \
npx tsx createQuizData/addQuizData.ts
```

Or run individually (see Usage section below).

## File Structure

```bash
createQuizData
├── README.md                       # Instructions for running seed scripts (This file)
├── addCategories.ts                # Seeds categories and conflict groups
├── addTags.ts                      # Seeds all tags linked to categories
├── addQuizData.ts                  # Seeds quiz stages, questions, options, and insights
└── data/
    ├── quizQuestions.ts            # Quiz questions data
    └── quizTags.ts                 # Quiz tags data
```

## Data Organization

**Separated Data Files:**

- Quiz questions are extracted to `data/quizQuestions.ts` for easier maintenance
- Quiz tags are extracted to `data/quizTags.ts` for easier maintenance
- Categories remain in `addCategories.ts` due to runtime dependencies on conflict group IDs

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
npx tsx createQuizData/addCategories.ts

# Step 2: Seed tags (requires categories to exist)
npx tsx createQuizData/addTags.ts

# Step 3: Seed quiz data (requires categories to exist)
npx tsx createQuizData/addQuizData.ts
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

 OVERALL STATISTICS:
   Total records seeded: 253
   Total successful: 253
   Total failures: 0
   Success rate: 100.0%
================================================================================
 All records seeded successfully!
================================================================================
```

### Partial Success Should Show

```bash
 OVERALL STATISTICS:
   Total records seeded: 253
   Total successful: 240
   Total failures: 13
   Success rate: 94.9%
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

## Handling Failures

When seeding, failed entries are logged with detailed reasons:

```bash
=== STEP 1: Seeding Categories ===
Skipping category Adventure: Already exists

=== STEP 2: Seeding Tags ===
Error creating tag persona:solo: Category not found: persona

=== STEP 3: Seeding Quiz Data ===
QuizStage not found: Exploring
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

3. **High Skip Count**

   ```bash
   12 categories upserted (all skipped - already exist)
   ```

   **Solution**: This is normal behavior on subsequent runs due to upsert logic

### Debugging Tips

- **Check execution order**: Categories → Tags → Quiz Data
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

## Best Practices

1. **Always backup database** before running seed scripts
2. **Run in correct order**: Categories → Tags → Quiz Data
3. **Monitor seed output** for data quality issues
4. **Test with sample data** first if modifying scripts
5. **Keep seed files in version control** for reproducibility

## Re-seeding Data

To re-seed data:

1. **Clear existing data** (if needed):

   ```sql
   -- Clear quiz data
   DELETE FROM "QuizInsight";
   DELETE FROM "QuizOption";
   DELETE FROM "QuizQuestion";
   DELETE FROM "QuizStage";

   -- Clear tags
   DELETE FROM "Tag";

   -- Clear categories
   DELETE FROM "Category";
   DELETE FROM "ConflictGroup";
   ```

2. **Reset sequences**:

   ```sql
   ALTER SEQUENCE "QuizStage_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "QuizQuestion_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "QuizOption_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "QuizInsight_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "Tag_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;
   ALTER SEQUENCE "ConflictGroup_id_seq" RESTART WITH 1;
   ```

3. **Run seed scripts** again:

   ```bash
   npx tsx createQuizData/addCategories.ts
   npx tsx createQuizData/addTags.ts
   npx tsx createQuizData/addQuizData.ts
   ```

## Notes

- Scripts use **upsert** operations to prevent duplicates
- **Conflict groups** ensure certain categories are mutually exclusive
- **Quiz insights** provide contextual nudges for each quiz option
- All scripts include **cleanup handlers** to close database connections properly
- **Category-to-tag mapping** enables powerful filtering and recommendation logic
