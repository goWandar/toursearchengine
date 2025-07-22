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

async function importTourPrices() {
  console.log('Starting Tour Prices import from TourPrices.csv...');

  try {
    if (!fs.existsSync('TourPrices.csv')) {
      throw new Error('TourPrices.csv file not found');
    }

    console.log('Reading: ./TourPrices.csv');

    const csvContent = fs.readFileSync('TourPrices.csv', 'utf8');
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimitersToGuess: [',', '\t', '|', ';'],
    });

    if (parsed.errors.length > 0) {
      console.warn('CSV parsing warnings:', parsed.errors);
    }

    console.log(`Found ${parsed.data.length} tour prices to import`);
    console.log(`CSV Headers: ${parsed.meta.fields?.join(', ')}`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    const existingTours = await prisma.tour.findMany({
      select: { id: true, uniqueId: true },
    });

    const tourIdMap = new Map<string, number>();
    for (const tour of existingTours) {
      tourIdMap.set(tour.uniqueId, tour.id);
    }

    console.log(`Mapped ${existingTours.length} existing tours.`);

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i] as Record<string, any>;

      try {
        const tourUniqueId = cleanString(row.tourUniqueId);
        const tourId = tourIdMap.get(tourUniqueId || '');

        if (!tourUniqueId || !tourId) {
          skippedCount++;
          console.warn(
            `[Row ${i + 1}] Skipped: Invalid or unmatched tourUniqueId: ${tourUniqueId}`,
          );
          continue;
        }

        const priceData = {
          numOfPeople: Number(row.numOfPeople) || 0,
          currency: cleanString(row.currency) || 'USD',
          pricePerPerson: Number(row.pricePerPerson) || 0,
          seasonName: cleanString(row.seasonName),
          seasonPeriod: cleanString(row.seasonPeriod),
          dateCreated: parseDate(row.dateCreated) || new Date(),
          dateModified: parseDate(row.dateModified),
          tourId,
          tourUniqueId,
        };

        if (priceData.pricePerPerson < 0) {
          throw new Error('Invalid price: cannot be negative');
        }

        await prisma.tourPrice.create({ data: priceData });
        successCount++;
        console.log(
          `[${successCount}] Imported price for tour: ${tourUniqueId} (${priceData.currency} ${priceData.pricePerPerson})`,
        );
      } catch (error) {
        errorCount++;
        console.error(`[Row ${i + 1}] Failed to import price:`, {
          tourUniqueId: row.tourUniqueId,
          pricePerPerson: row.pricePerPerson,
          currency: row.currency,
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    console.log('\nTour Prices import completed.');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Skipped: ${skippedCount}`);

    const totalPrices = await prisma.tourPrice.count();
    console.log(`Total tour prices in database: ${totalPrices}`);

    const priceStats = await prisma.tourPrice.aggregate({
      _avg: { pricePerPerson: true },
      _min: { pricePerPerson: true },
      _max: { pricePerPerson: true },
    });

    console.log('Price Statistics:');
    console.log(`  Average: ${priceStats._avg.pricePerPerson?.toFixed(2)}`);
    console.log(`  Min: ${priceStats._min.pricePerPerson}`);
    console.log(`  Max: ${priceStats._max.pricePerPerson}`);
  } catch (error) {
    console.error('Tour Prices import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// ESM-compatible entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  importTourPrices().catch(console.error);
}

export { importTourPrices };
