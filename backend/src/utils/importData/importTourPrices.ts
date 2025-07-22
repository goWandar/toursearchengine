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

async function importTourPrices() {
  console.log('Starting Tour Prices import...');

  try {
    const parsed = parseCSV('TourPrices.csv', 'TourPrices.csv');
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

        const priceData = {
          numOfPeople: Number(row.numOfPeople) || 0,
          currency: cleanString(row.currency) || 'USD',
          pricePerPerson: Number(row.pricePerPerson) || 0,
          seasonName: cleanString(row.seasonName),
          seasonPeriod: cleanString(row.seasonPeriod),
          dateCreated: parseDate(row.dateCreated) || new Date(),
          dateModified: parseDate(row.dateModified),
          ...tourRef,
        };

        if (priceData.pricePerPerson < 0) {
          throw new Error('Invalid price: cannot be negative');
        }

        await prisma.tourPrice.create({ data: priceData });
        counts.success++;
        logProgress(
          counts,
          `Imported price for tour: ${tourRef.tourUniqueId} (${priceData.currency} ${priceData.pricePerPerson})`,
        );
      } catch (error) {
        counts.errors++;
        console.error(`[Row ${i + 1}] Failed to import price:`, error);
      }
    }

    logSummary(counts, 'Tour Prices');

    // Price statistics
    const totalPrices = await prisma.tourPrice.count();
    const priceStats = await prisma.tourPrice.aggregate({
      _avg: { pricePerPerson: true },
      _min: { pricePerPerson: true },
      _max: { pricePerPerson: true },
    });

    console.log(`Total tour prices in database: ${totalPrices}`);
    console.log('Price Statistics:');
    console.log(`  Average: ${priceStats._avg.pricePerPerson?.toFixed(2)}`);
    console.log(`  Min: ${priceStats._min.pricePerPerson}`);
    console.log(`  Max: ${priceStats._max.pricePerPerson}`);
  } finally {
    await cleanup();
  }
}

export { importTourPrices };
