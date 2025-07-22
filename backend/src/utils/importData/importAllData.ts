import { importTours } from './importTours.js';
import { importTourImages } from './importTourImages.js';
import { importTourPrices } from './importTourPrices.js';

async function runCompleteImport() {
  await importTours();
  await importTourImages();
  await importTourPrices();
}

runCompleteImport();
