import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import Papa from 'papaparse';

const prisma = new PrismaClient();

// Utility: Parse date from string or number
function parseDate(dateValue: any): Date | null {
  if (!dateValue) return null;
  const parsed = new Date(dateValue);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Utility: Clean strings and convert empty to null
function cleanString(value: any): string | null {
  if (!value) return null;
  const cleaned = String(value).trim();
  return cleaned === '' ? null : cleaned;
}

// Main import function
async function importTours() {
  console.log('Starting Tours import from Tours.csv...');

  try {
    if (!fs.existsSync('Tours.csv')) {
      throw new Error('Tours.csv file not found');
    }

    const csvContent = fs.readFileSync('Tours.csv', 'utf8');

    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimitersToGuess: [',', '\t', '|', ';'],
    });

    if (parsed.errors.length > 0) {
      console.warn('CSV parsing warnings:', parsed.errors);
    }

    console.log(`Found ${parsed.data.length} tours to import`);
    console.log(`CSV Headers: ${parsed.meta.fields?.join(', ')}`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i] as any;

      try {
        // Skip row if required fields are missing
        if (!row.title && !row.uniqueId) {
          skippedCount++;
          continue;
        }

        const tourData = {
          uniqueId: cleanString(row.uniqueId) || `tour-${Date.now()}-${i}`,
          title: cleanString(row.title) || 'Untitled Tour',
          description: cleanString(row.description),
          location: row.location ? String(row.location) : null,
          countryId: row.countryId ? Math.floor(Number(row.countryId)) : null,
          durationInDays: Number(row.durationInDays) || 0,
          itinerary: cleanString(row.itinerary),
          accommodationType: cleanString(row.accommodationType),
          siteURL: cleanString(row.siteURL),
          included: cleanString(row.included),
          excluded: cleanString(row.excluded),
          dateCreated: parseDate(row.dateCreated) || new Date(),
          dateModified: parseDate(row.dateModified),
          archived: Boolean(row.archived),
          operatorId:
            row.operatorId && row.operatorId !== '' ? parseInt(String(row.operatorId)) : null,
        };

        if (!tourData.uniqueId || !tourData.title) {
          throw new Error('Missing required fields: uniqueId or title');
        }

        await prisma.tour.create({ data: tourData });
        successCount++;
        console.log(`[${successCount}] Imported: ${tourData.title}`);
      } catch (error) {
        errorCount++;
        console.error(`[Row ${i + 1}] Failed to import:`, {
          title: row.title,
          uniqueId: row.uniqueId,
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    console.log('\nImport completed');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Skipped: ${skippedCount}`);

    const totalTours = await prisma.tour.count();
    console.log(`Total tours in database: ${totalTours}`);
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run only if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importTours().catch(console.error);
}

export { importTours };
