// // Use with caution! This script deletes all data from the database!

// import { config } from "dotenv";
// import { cleanup, prisma } from "./sharedUtils/importDataUtils.js";
// import { join, dirname } from 'path';
// import { fileURLToPath } from "url";

// // Get the directory of the current script
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// config({ path: join(__dirname, '..', '..', '..', '.env') });

// async function deleteAllTours() {
//     console.log('Deleting all Tours...');

//     try {
//         const deletedCount = await prisma.tour.deleteMany({});
//         console.log(`Deleted ${deletedCount.count} tours.`);
//     } catch (error) {
//         console.error('Error deleting tours:', error);
//         throw error;
//     } finally {
//         cleanup();
//     }
// }

// async function deleteAllData() {
//     console.log('Starting deletion of all data...');

//     try {
//         await deleteAllTours();
//         console.log('All data deleted successfully.');
//     } catch (error) {
//         console.error('Error during deletion process:', error);
//     }
// }

// deleteAllData()
//     .then(() => console.log('Deletion process completed.'))
//     .catch((error) => console.error('Deletion process failed:', error));