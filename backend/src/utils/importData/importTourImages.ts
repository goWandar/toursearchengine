import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import Papa from 'papaparse';

const prisma = new PrismaClient();

// Utility: Convert value to Date
function parseDate(dateValue: any): Date | null {
  if (!dateValue) return null;

  const parsed = new Date(dateValue);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Utility: Trim strings and convert empty to null
function cleanString(value: any): string | null {
  if (!value) return null;
  const cleaned = String(value).trim();
  return cleaned === '' ? null : cleaned;
}

async function importTourImages() {
  console.log('Starting Tour Images import from TourImages.csv...');

  try {
    if (!fs.existsSync('TourImages.csv')) {
      throw new Error('TourImages.csv file not found');
    }

    console.log('Reading: ./TourImages.csv');

    const csvContent = fs.readFileSync('TourImages.csv', 'utf8');
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimitersToGuess: [',', '\t', '|', ';'],
    });

    if (parsed.errors.length > 0) {
      console.warn('CSV parsing warnings:', parsed.errors);
    }

    console.log(`Found ${parsed.data.length} tour images to import`);
    console.log(`CSV Headers: ${parsed.meta.fields?.join(', ')}`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    // Build a map: uniqueId -> id
    const existingTours = await prisma.tour.findMany({
      select: { id: true, uniqueId: true },
    });

    const tourIdMap = new Map<string, number>();
    for (const tour of existingTours) {
      tourIdMap.set(tour.uniqueId, tour.id);
    }

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i] as Record<string, any>;

      try {
        const tourUniqueId = cleanString(row.tourUniqueId);
        const tourId = tourIdMap.get(tourUniqueId ?? '');

        if (!tourUniqueId || !tourId) {
          skippedCount++;
          console.warn(
            `[Row ${i + 1}] Skipped: Invalid or unmatched tourUniqueId: ${tourUniqueId}`,
          );
          continue;
        }

        const imageData = {
          imageUrls: cleanString(row.imageUrls) || '',
          dateCreated: parseDate(row.dateCreated) || new Date(),
          dateModified: parseDate(row.dateModified),
          tourId,
          tourUniqueId,
        };

        if (!imageData.imageUrls) {
          throw new Error('Missing imageUrls');
        }

        await prisma.tourImage.create({ data: imageData });
        successCount++;
        console.log(`[${successCount}] Imported image for tour: ${tourUniqueId}`);
      } catch (error) {
        errorCount++;
        console.error(`[Row ${i + 1}] Failed to import image:`, {
          tourUniqueId: row.tourUniqueId,
          imageUrls: row.imageUrls ? 'present' : 'missing',
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    console.log('\nTour Images import completed.');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Skipped: ${skippedCount}`);

    const totalImages = await prisma.tourImage.count();
    console.log(`Total tour images in database: ${totalImages}`);
  } catch (error) {
    console.error('Tour Images import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run only if executed directly (ESM-safe check)
if (import.meta.url === `file://${process.argv[1]}`) {
  importTourImages().catch(console.error);
}

export { importTourImages };
