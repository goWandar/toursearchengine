import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import Papa from 'papaparse';

// Shared utilities for CSV import scripts
export const prisma = new PrismaClient();

// Utility: Convert value to Date
export function parseDate(dateValue: any): Date | null {
  if (!dateValue) return null;
  const parsed = new Date(dateValue);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Utility: Trim strings and convert empty to null
export function cleanString(value: any): string | null {
  if (!value) return null;
  const cleaned = String(value).trim();
  return cleaned === '' ? null : cleaned;
}

// Create tour ID mapping for efficient lookups
export async function createTourIdMap(): Promise<Map<string, number>> {
  const existingTours = await prisma.tour.findMany({
    select: { id: true, uniqueId: true },
  });

  const tourIdMap = new Map<string, number>();
  for (const tour of existingTours) {
    tourIdMap.set(tour.uniqueId, tour.id);
  }

  console.log(`Mapped ${existingTours.length} existing tours.`);
  return tourIdMap;
}

// Generic CSV parsing setup
export function parseCSV(filePath: string, fileName: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${fileName} file not found`);
  }

  console.log(`Reading: ./${fileName}`);
  const csvContent = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse(csvContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimitersToGuess: [',', '\t', '|', ';'],
  });

  if (parsed.errors.length > 0) {
    console.warn('CSV parsing warnings:', parsed.errors);
  }

  console.log(`Found ${parsed.data.length} rows to import`);
  console.log(`CSV Headers: ${parsed.meta.fields?.join(', ')}`);

  return parsed;
}

// Progress tracking interface
export interface ImportCounts {
  success: number;
  errors: number;
  skipped: number;
}

// Initialize progress counters
export function initializeProgress(): ImportCounts {
  return { success: 0, errors: 0, skipped: 0 };
}

// Log progress with counter
export function logProgress(counts: ImportCounts, message: string) {
  console.log(`[${counts.success}] ${message}`);
}

// Log final summary
export function logSummary(counts: ImportCounts, itemType: string) {
  console.log(`\n${itemType} import completed.`);
  console.log(`Success: ${counts.success}`);
  console.log(`Errors: ${counts.errors}`);
  console.log(`Skipped: ${counts.skipped}`);
}

// Generic tour validation
export function validateTourReference(
  tourUniqueId: string | null,
  tourIdMap: Map<string, number>,
  rowIndex: number,
): { tourId: number; tourUniqueId: string } | null {
  if (!tourUniqueId) {
    console.warn(`[Row ${rowIndex + 1}] Skipped: Missing tourUniqueId`);
    return null;
  }

  const tourId = tourIdMap.get(tourUniqueId);
  if (!tourId) {
    console.warn(`[Row ${rowIndex + 1}] Skipped: Unmatched tourUniqueId: ${tourUniqueId}`);
    return null;
  }

  return { tourId, tourUniqueId };
}

// Cleanup function
export async function cleanup() {
  await prisma.$disconnect();
}
