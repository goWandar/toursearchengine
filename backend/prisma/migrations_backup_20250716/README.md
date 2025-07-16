# Prisma Migrations Backup – 2025-07-16

## Reason for Backup

This folder contains a full backup of the existing Prisma migration history prior to resolving schema drift issues caused by inconsistencies between the local Prisma schema and the Supabase production database.

## Context

- Supabase schema had changes that Prisma considered as "drift".
- Attempting to run `prisma migrate dev` resulted in errors due to mismatch with `_TourParks`, `parks`, `tours`, and other existing tables.
- To avoid data loss and maintain control, the new `QuizResponse` and `QuizConfig` models will be added manually using SQL.

## Backup Details

- Backup taken: **2025-07-16**
- Original migrations folder: `prisma/migrations`
- Backup created at: `prisma/migrations_backup_20250716_1830/`
- Developer: *<jacekroszkowiakdev@gmail.com>*

## Next Steps

1. Manually create `quiz_responses` and `quiz_config` tables in Supabase.
2. Run:

   ```bash
   npx prisma db pull
   npx prisma generate
   ```
