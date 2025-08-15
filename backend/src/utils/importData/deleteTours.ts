// // Use with caution! This script deletes all data from the database!

// import { config } from "dotenv";
// import { prisma, cleanup } from "./sharedUtils/importDataUtils.js";
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";

// // Load environment variables from .env file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// config({ path: join(__dirname, "..", "..", "..", ".env") });


// async function deleteToursByIdRange(startId: number, endId: number | null = null) {
//     console.log(`\n=== Deleting Tours ===`);

//     // If no range specified, delete only one tour
//     const deleteCondition = endId
//         ? { id: { gte: startId, lte: endId } }
//         : { id: startId };

//     try {
//         // Count matching tours before deletion
//         const countBefore = await prisma.tour.count({ where: deleteCondition });
//         console.log(`Found ${countBefore} tour(s) matching criteria.`);

//         if (countBefore === 0) {
//             console.log("No matching tours found. Aborting.");
//             return;
//         }

//         // Delete tours (cascade will remove related TourImages & TourPrices)
//         const deleted = await prisma.tour.deleteMany({ where: deleteCondition });
//         console.log(`Deleted ${deleted.count} tour(s) successfully.`);
//     } catch (error) {
//         console.error("Error deleting tours:", error);
//         throw error;
//     } finally {
//         cleanup();
//     }
// }

// // Get CLI arguments and run deletion
// const args = process.argv.slice(2);
// if (args.length === 0) {
//     console.error("Please provide at least a starting tourId.");
//     console.error(" npx tsx deleteTours.ts 10        # Deletes only tour with ID 10");
//     console.error(" npx tsx deleteTours.ts 10 15     # Deletes tours with IDs 10 through 15 inclusive");
//     process.exit(1);
// }

// const startId = parseInt(args[0], 10);
// const endId = args[1] ? parseInt(args[1], 10) : null;

// // Validate numeric input
// if (isNaN(startId) || (endId !== null && isNaN(endId))) {
//     console.error("Invalid tourId. Please provide valid numbers.");
//     console.error(" Example: npx tsx deleteTours.ts 5 or npx tsx deleteTours.ts 5 8");
//     process.exit(1);
// }

// // Run deletion
// deleteToursByIdRange(startId, endId)
//     .then(() => console.log("Deletion process completed.\n"))
//     .catch((err) => console.error("Deletion process failed:", err));
