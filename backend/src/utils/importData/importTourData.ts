import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TourCSV = {
  id: string;
  uniqueId: string;
  title: string;
  description?: string;
  location?: string;
  countryId?: string;
  durationInDays?: string;
  itinerary?: string;
  accommodationType?: string;
  siteURL?: string;
  included?: string;
  excluded?: string;
  operatorId?: string;
};

type TourPriceCSV = {
  id: string;
  tourId: string;
  tourUniqueId: string;
  numOfPeople: string;
  currency: string;
  pricePerPerson: string;
  seasonName?: string;
  seasonPeriod?: string;
};

type TourImageCSV = {
  id: string;
  tourId: string;
  tourUniqueId: string;
  imageUrls: string;
};

function parseCSV<T>(filename: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'csv', filename);
    const file = fs.readFileSync(filePath, 'utf8');

    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: reject,
    });
  });
}

async function main() {
  const tourCsv = await parseCSV<TourCSV>('Tours.csv');
  const tourPriceCsv = await parseCSV<TourPriceCSV>('TourPrices.csv');
  const tourImageCsv = await parseCSV<TourImageCSV>('TourImages.csv');

  const tourMap = new Map<string, number>();

  console.log(`Importing ${tourCsv.length} tours...`);

  for (const tour of tourCsv) {
    const createdTour = await prisma.tour.upsert({
      where: { uniqueId: tour.uniqueId },
      update: {},
      create: {
        uniqueId: tour.uniqueId,
        title: tour.title,
        description: tour.description,
        location: tour.location,
        countryId: tour.countryId ? Number(tour.countryId) : null,
        durationInDays: Number(tour.durationInDays || 0),
        itinerary: tour.itinerary,
        accommodationType: tour.accommodationType,
        siteURL: tour.siteURL,
        included: tour.included,
        excluded: tour.excluded,
        operatorId: tour.operatorId ? Number(tour.operatorId) : null,
      },
    });

    tourMap.set(`${tour.id}-${tour.uniqueId}`, createdTour.id);
  }

  console.log(`Importing ${tourPriceCsv.length} tour prices...`);

  for (const price of tourPriceCsv) {
    const tourKey = `${price.tourId}-${price.tourUniqueId}`;
    const tourId = tourMap.get(tourKey);

    if (!tourId) {
      console.warn(`No match found for tourPrice row: ${tourKey}`);
      continue;
    }

    await prisma.tourPrice.create({
      data: {
        tourId,
        tourUniqueId: price.tourUniqueId,
        numOfPeople: Number(price.numOfPeople || 0),
        currency: price.currency,
        pricePerPerson: Number(price.pricePerPerson || 0),
        seasonName: price.seasonName,
        seasonPeriod: price.seasonPeriod,
      },
    });
  }

  console.log(`Importing ${tourImageCsv.length} tour images...`);

  for (const img of tourImageCsv) {
    const tourKey = `${img.tourId}-${img.tourUniqueId}`;
    const tourId = tourMap.get(tourKey);

    if (!tourId) {
      console.warn(`No match found for tourImage row: ${tourKey}`);
      continue;
    }

    await prisma.tourImage.create({
      data: {
        tourId,
        tourUniqueId: img.tourUniqueId,
        imageUrls: img.imageUrls,
      },
    });
  }

  console.log('✅ All data imported!');
}

main()
  .catch((e) => {
    console.error('❌ Import failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
