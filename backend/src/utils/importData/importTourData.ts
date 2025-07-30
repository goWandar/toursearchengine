import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the project root
config({ path: join(__dirname, '..', '..', '..', '.env') });

const prisma = new PrismaClient();

interface TourCSV {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  location: string;
  countryId: string;
  durationInDays: string;
  itinerary: string;
  accommodationType: string;
  included: string;
  excluded: string;
  siteURL: string;
  dateCreated: string;
  dateModified: string;
  archived: string;
  operatorId: string;
}

interface TourImageCSV {
  id: string;
  imageUrls: string;
  dateCreated: string;
  dateModified: string;
  tourUniqueId: string;
  tourId: string;
}

interface TourPriceCSV {
  id: string;
  seasonName: string;
  seasonPeriod: string;
  numOfPeople: string;
  currency: string;
  pricePerPerson: string;
  dateCreated: string;
  dateModified: string;
  tourUniqueId: string;
  tourId: string;
}

function parseCSV<T>(filePath: string): T[] {
  try {
    const csvContent = readFileSync(filePath, 'utf8');
    const result = Papa.parse<T>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (result.errors.length > 0) {
      console.error(`Errors parsing ${filePath}:`, result.errors);
    }

    return result.data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

function parseDate(dateString: string): Date | null {
  if (!dateString || dateString.trim() === '') return null;

  // Handle MM/DD/YYYY HH:mm:ss format
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

function parseInteger(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

function parseFloat(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const parsed = Number.parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function parseBoolean(value: string): boolean {
  return value?.toLowerCase() === 'true';
}

async function main() {
  console.log('Starting CSV import process...');

  // Read CSV files
  console.log('Reading CSV files...');
  const tours = parseCSV<TourCSV>(join(__dirname, 'Tours.csv'));
  const tourImages = parseCSV<TourImageCSV>(join(__dirname, 'TourImages.csv'));
  const tourPrices = parseCSV<TourPriceCSV>(join(__dirname, 'TourPrices.csv'));

  console.log(`Found ${tours.length} tours, ${tourImages.length} tour images, ${tourPrices.length} tour prices`);

  // Track statistics
  let toursImported = 0;
  let tourImagesImported = 0;
  let tourPricesImported = 0;

  // Map old tour IDs to new ones: oldId -> { newId, uniqueId }
  const tourIdMapping = new Map<string, { newId: number; uniqueId: string }>();

  // STEP 1: Import all tours first
  console.log('\n=== STEP 1: Importing Tours ===');
  for (const tourData of tours) {
    try {
      console.log(`Processing tour: ${tourData.id} - ${tourData.title}`);

      // Prepare tour data for insertion
      const tourInsertData = {
        uniqueId: tourData.uniqueId,
        title: tourData.title,
        description: tourData.description || null,
        location: tourData.location || null,
        countryId: parseInteger(tourData.countryId),
        durationInDays: parseInteger(tourData.durationInDays) || 0,
        itinerary: tourData.itinerary || null,
        accommodationType: tourData.accommodationType || null,
        siteURL: tourData.siteURL || null,
        included: tourData.included || null,
        excluded: tourData.excluded || null,
        dateCreated: parseDate(tourData.dateCreated) || new Date(),
        dateModified: parseDate(tourData.dateModified),
        archived: parseBoolean(tourData.archived),
        operatorId: parseInteger(tourData.operatorId),
      };

      // Insert tour
      const newTour = await prisma.tour.create({
        data: tourInsertData,
      });

      // Map old ID to new ID and uniqueId
      tourIdMapping.set(tourData.id, {
        newId: newTour.id,
        uniqueId: newTour.uniqueId
      });

      toursImported++;
      console.log(`✓ Tour imported: Old ID ${tourData.id} -> New ID ${newTour.id}`);

    } catch (error) {
      console.error(`✗ Failed to insert tour ${tourData.id} - ${tourData.title}:`, error);
    }
  }

  console.log(`\n✅ Tours completed: ${toursImported}/${tours.length} imported`);

  // STEP 2: Import all tour images
  console.log('\n=== STEP 2: Importing Tour Images ===');
  for (const imageData of tourImages) {
    try {
      // Find the new tour ID using old ID mapping
      const tourMapping = tourIdMapping.get(imageData.tourId);

      if (!tourMapping) {
        console.log(`⚠️ Skipping image ${imageData.id}: No mapping found for tour ID ${imageData.tourId}`);
        continue;
      }

      // Verify uniqueId matches (extra safety check)
      if (tourMapping.uniqueId !== imageData.tourUniqueId) {
        console.log(`⚠️ Skipping image ${imageData.id}: UniqueId mismatch for tour ID ${imageData.tourId}`);
        continue;
      }

      const imageInsertData = {
        imageUrls: imageData.imageUrls,
        dateCreated: parseDate(imageData.dateCreated) || new Date(),
        dateModified: parseDate(imageData.dateModified),
        tourId: tourMapping.newId, // Use new tour ID
        tourUniqueId: imageData.tourUniqueId,
      };

      await prisma.tourImage.create({
        data: imageInsertData,
      });

      tourImagesImported++;

      if (tourImagesImported % 50 === 0) {
        console.log(`Progress: ${tourImagesImported}/${tourImages.length} images imported`);
      }

    } catch (error) {
      console.error(`✗ Failed to insert tour image ${imageData.id} for tour ${imageData.tourId}:`, error);
    }
  }

  console.log(`\n✅ Tour Images completed: ${tourImagesImported}/${tourImages.length} imported`);

  // STEP 3: Import all tour prices
  console.log('\n=== STEP 3: Importing Tour Prices ===');
  for (const priceData of tourPrices) {
    try {
      // Find the new tour ID using old ID mapping
      const tourMapping = tourIdMapping.get(priceData.tourId);

      if (!tourMapping) {
        console.log(`⚠️ Skipping price ${priceData.id}: No mapping found for tour ID ${priceData.tourId}`);
        continue;
      }

      // Verify uniqueId matches (extra safety check)
      if (tourMapping.uniqueId !== priceData.tourUniqueId) {
        console.log(`⚠️ Skipping price ${priceData.id}: UniqueId mismatch for tour ID ${priceData.tourId}`);
        continue;
      }

      const priceInsertData = {
        numOfPeople: parseInteger(priceData.numOfPeople) || 0,
        currency: priceData.currency,
        pricePerPerson: parseFloat(priceData.pricePerPerson) || 0,
        seasonName: priceData.seasonName || null,
        seasonPeriod: priceData.seasonPeriod || null,
        dateCreated: parseDate(priceData.dateCreated) || new Date(),
        dateModified: parseDate(priceData.dateModified),
        tourId: tourMapping.newId, // Use new tour ID
        tourUniqueId: priceData.tourUniqueId,
      };

      await prisma.tourPrice.create({
        data: priceInsertData,
      });

      tourPricesImported++;

      if (tourPricesImported % 50 === 0) {
        console.log(`Progress: ${tourPricesImported}/${tourPrices.length} prices imported`);
      }

    } catch (error) {
      console.error(`✗ Failed to insert tour price ${priceData.id} for tour ${priceData.tourId}:`, error);
    }
  }

  console.log(`\n✅ Tour Prices completed: ${tourPricesImported}/${tourPrices.length} imported`);

  // Final Summary
  console.log('\n=== FINAL IMPORT SUMMARY ===');
  console.log(`🎯 Tours imported: ${toursImported}/${tours.length}`);
  console.log(`🖼️  Tour Images imported: ${tourImagesImported}/${tourImages.length}`);
  console.log(`💰 Tour Prices imported: ${tourPricesImported}/${tourPrices.length}`);
  console.log('\n🎉 Import process completed successfully!');
}

// Run the import
main()
  .catch((error) => {
    console.error('Fatal error during import:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });