# CSV Import Scripts

This directory contains scripts to import tour data from CSV files into the database using Prisma.

## File Structure

```
importData
├── README.md                     # Instructions for running import scripts (This file)
├── importAllData.ts              # Runs all import scripts in sequence
├── importTours.ts                # Imports Tours.csv (run first)
├── importTourImages.ts          # Imports TourImages.csv (run second)
├── importTourPrices.ts          # Imports TourPrices.csv (run third)
└── sharedUtils
    └── importDataUtils.ts       # Shared utility functions (date parser, cleaner, etc.)
```

## Prerequisites

1. **Database Setup**: Ensure your database is running and migrations are applied
2. **Environment Variables**: Configure `.env` with `DATABASE_URL` and `DIRECT_URL`
3. **Dependencies**: Install required packages:

   ```bash
   npm install @prisma/client papaparse
   npm install -D @types/papaparse tsx
   ```

## CSV File Location

**IMPORTANT**: Place your `.csv` files in the `importData/` directory (same level as the import scripts). This must be done manually — these files are excluded from version control (`.gitignore`).

The scripts expect the following files to exist:

- `./Tours.csv`
- `./TourImages.csv`
- `./TourPrices.csv`

## Usage

### Option 1: Import All Data at Once (Recommended)

```bash
# Import all CSV files in the correct order
npx tsx import-all-data.ts
```

This will automatically:

1. Import Tours first (creates base tour records)
2. Import TourImages second (links to existing tours)
3. Import TourPrices third (links to existing tours)

### Option 2: Import Individual Files

If you need to import files separately or in case of errors:

```bash
# Step 1: Import Tours (must run first)
npx tsx import-tours.ts

# Step 2: Import Tour Images (after tours)
npx tsx import-tour-images.ts

# Step 3: Import Tour Prices (after tours)
npx tsx import-tour-prices.ts
```

**Important**: Tours must be imported first as Images and Prices depend on existing tour records.

## Expected Results

### Successful Import Should Show

```
Tours: 55 records imported
Tour Images: 517 records imported  
Tour Prices: 229 records imported
```

### Import Statistics Example

```
Tour Prices import completed.
Success: 229
Errors: 0
Skipped: 0
Total tour prices in database: 229
Price Statistics:
  Average: 5237.84
  Min: 665
  Max: 22990
```

## Features

### Data Validation

- **Type conversion**: Handles string/number/date conversions automatically
- **Data cleaning**: Trims whitespace, converts empty strings to null
- **Foreign key validation**: Ensures TourImages and TourPrices link to existing tours
- **Business logic**: Validates prices are non-negative

### Error Handling

- **Row-level errors**: Continues processing if individual rows fail
- **Detailed logging**: Shows exactly which rows failed and why
- **Progress tracking**: Displays success/error/skipped counts
- **File validation**: Checks if CSV files exist before processing

### Robust CSV Parsing

- **Multiple delimiters**: Auto-detects `,`, `\t`, `|`, `;`
- **Header detection**: Automatically maps CSV headers to database fields
- **Empty line handling**: Skips blank rows
- **Dynamic typing**: Converts strings to appropriate data types

## Troubleshooting

### Common Issues

1. **File Not Found Error**

   ```
   Error: Tours.csv file not found
   ```

   **Solution**: Ensure CSV files are in the same directory as scripts

2. **High Skip Count**

   ```
   Success: 100, Errors: 0, Skipped: 50
   ```

   **Solution**: Check that `tourUniqueId` in Images/Prices matches `uniqueId` in Tours

3. **Migration Drift After Import**

   ```bash
   # Test for schema drift after import
   npx prisma migrate dev --name test-after-import --create-only
   ```

   **Expected**: "No schema changes found"

### Debugging Tips

- **Check CSV headers**: Ensure column names match expected format
- **Validate data types**: Verify dates, numbers are in correct format  
- **Review error logs**: Failed rows show specific validation errors
- **Test with small dataset**: Try importing subset of data first

## Technical Details

### Dependencies

- **@prisma/client**: Database ORM and type safety
- **papaparse**: Robust CSV parsing with error handling
- **tsx**: TypeScript execution for Node.js

### Data Flow

```
CSV Files → Papa Parse → Data Validation → Prisma Create → Database
```

### Foreign Key Relationships

- `TourImage.tourId + tourUniqueId` → `Tour.id + uniqueId`
- `TourPrice.tourId + tourUniqueId` → `Tour.id + uniqueId`
- `Tour.countryId` → `Country.id` (optional)
- `Tour.operatorId` → `Operator.id` (optional)

## Best Practices

1. **Always backup database** before large imports
2. **Test with sample data** first  
3. **Monitor import statistics** for data quality issues
4. **Run schema drift checks** after imports
5. **Keep CSV files in version control** for reproducibility

## Re-importing Data

To re-import data:

1. **Clear existing data** (if needed):

   ```sql
   DELETE FROM tour_prices;
   DELETE FROM tour_images;
   DELETE FROM tours;
   ```

2. **Reset sequences**:

   ```sql
   ALTER SEQUENCE tours_id_seq RESTART WITH 1;
   ALTER SEQUENCE tour_images_id_seq RESTART WITH 1;
   ALTER SEQUENCE tour_prices_id_seq RESTART WITH 1;
   ```

3. **Run import scripts** again

## Notes

- Scripts use **composite foreign keys** (`tourId + tourUniqueId`) for data integrity
- **Timestamps** are preserved from CSV data when available
- **Auto-generated values** are used for missing required fields
- All scripts include **cleanup handlers** to close database connections properly
