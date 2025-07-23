import {
  parseCSV,
  createTourIdMap,
  validateTourReference,
  initializeProgress,
  logProgress,
  logSummary,
  prisma,
  cleanup,
  parseDate,
  cleanString,
} from './sharedUtils/importDataUtils.js';

async function importTourImages() {
  console.log('Starting Tour Images import...');

  try {
    const parsed = parseCSV('TourImages.csv', 'TourImages.csv');
    const tourIdMap = await createTourIdMap();
    const counts = initializeProgress();

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i] as Record<string, any>;

      try {
        const tourRef = validateTourReference(cleanString(row.tourUniqueId), tourIdMap, i);
        if (!tourRef) {
          counts.skipped++;
          continue;
        }

        const imageData = {
          imageUrls: cleanString(row.imageUrls) || '',
          dateCreated: parseDate(row.dateCreated) || new Date(),
          dateModified: parseDate(row.dateModified),
          ...tourRef,
        };

        if (!imageData.imageUrls) {
          throw new Error('Missing imageUrls');
        }

        await prisma.tourImage.create({ data: imageData });
        counts.success++;
        logProgress(counts, `Imported image for tour: ${tourRef.tourUniqueId}`);
      } catch (error) {
        counts.errors++;
        console.error(`[Row ${i + 1}] Failed to import image:`, error);
      }
    }

    logSummary(counts, 'Tour Images');

    const totalImages = await prisma.tourImage.count();
    console.log(`Total tour images in database: ${totalImages}`);
  } finally {
    await cleanup();
  }
}

export { importTourImages };
