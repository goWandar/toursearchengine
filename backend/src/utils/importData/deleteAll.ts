// // Use with caution! This script deletes all data from the database!


// import { config } from "dotenv";
// import { prisma } from "./sharedUtils/importDataUtils.js";
// import { join, dirname } from 'path';
// import { fileURLToPath } from "url";

// // Get the directory of the current script
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// config({ path: join(__dirname, '..', '..', '..', '.env') });

// async function deleteAllTourImages() {
//     console.log('Deleting all Tour Images...');

//     try {
//         const deletedCount = await prisma.tourImage.deleteMany({});
//         console.log(`Deleted ${deletedCount.count} tour images.`);
//     } catch (error) {
//         console.error('Error deleting tour images:', error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }


// async function deleteAllTourPrices() {
//     console.log('Deleting all Tour Prices...');

//     try {
//         const deletedCount = await prisma.tourPrice.deleteMany({});
//         console.log(`Deleted ${deletedCount.count} tour prices.`);
//     } catch (error) {
//         console.error('Error deleting tour prices:', error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// async function deleteAllTours() {
//     console.log('Deleting all Tours...');

//     try {
//         const deletedCount = await prisma.tour.deleteMany({});
//         console.log(`Deleted ${deletedCount.count} tours.`);
//     } catch (error) {
//         console.error('Error deleting tours:', error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// async function deleteAllData() {
//     console.log('Starting deletion of all data...');

//     try {
//         await deleteAllTourImages();
//         await deleteAllTourPrices();
//         await deleteAllTours();

//         console.log('All data deleted successfully.');
//     } catch (error) {
//         console.error('Error during deletion process:', error);
//     }
// }

// deleteAllData()
//     .then(() => console.log('Deletion process completed.'))
//     .catch((error) => console.error('Deletion process failed:', error));