import {
  parseCSV,
  initializeProgress,
  logProgress,
  logSummary,
  prisma,
  cleanup,
  parseDate,
  cleanString,
} from './sharedUtils/importDataUtils.js';

async function importTours() {
  console.log('Starting Tours import...');

  try {
    const parsed = parseCSV('Tours.csv', 'Tours.csv');
    const counts = initializeProgress();

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i] as Record<string, any>;

      try {
        // Skip row if required fields are missing
        if (!row.title && !row.uniqueId) {
          counts.skipped++;
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
        counts.success++;
        logProgress(counts, `Imported: ${tourData.title}`);
      } catch (error) {
        counts.errors++;
        console.error(`[Row ${i + 1}] Failed to import:`, {
          title: row.title,
          uniqueId: row.uniqueId,
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    logSummary(counts, 'Tours');

    const totalTours = await prisma.tour.count();
    console.log(`Total tours in database: ${totalTours}`);
  } catch (error) {
    console.error('Tours import failed:', error);
    throw error;
  } finally {
    await cleanup();
  }
}

// ESM-compatible entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  importTours().catch(console.error);
}

export { importTours };
