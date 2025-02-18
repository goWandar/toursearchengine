import { Prisma } from "@prisma/client";
import logger from "../utils/logger";

export const handlePrismaRequestError = (
    error: unknown,
    action: string
): { success: false; error: string } => {
    if (error instanceof Prisma.PrismaClientInitializationError) {
        logger.error(`Database connection failed during ${action}.`);
        return {
            success: false,
            error: "Database connection error. Try again later.",
        };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                logger.error(
                    `[UserService] Error: Unique constraint violated (${action})`
                );
                return { success: false, error: "Email already exists." };

            case "P2025":
                logger.error(
                    `[UserService] Error: Record not found (${action}).`
                );
                return { success: false, error: "Record not found." };

            case "P2003":
                logger.error(
                    `[UserService] Error: Foreign key constraint failed (${action}).`
                );
                return {
                    success: false,
                    error: "Invalid reference to another record.",
                };

            case "P2000":
                logger.error(
                    `[UserService] Error: Value too long for column (${action}).`
                );
                return { success: false, error: "Input value is too long." };

            case "P2011":
                logger.error(
                    `[UserService] Error: Null constraint violation (${action}).`
                );
                return {
                    success: false,
                    error: "Required fields cannot be null.",
                };

            case "P1000":
            case "P1001":
            case "P1008":
                logger.error(
                    `[UserService] Error: Database connection issue (${action}).`
                );
                return {
                    success: false,
                    error: "Database connection error. Try again later.",
                };

            default:
                logger.error(
                    `[UserService] Prisma error (${action}): `,
                    error.message
                );
                return {
                    success: false,
                    error: `Database error occurred (${error.code})`,
                };
        }
    }

    logger.error(`[UserService] Unexpected error (${action}):`, error);
    return { success: false, error: "An unexpected error occurred." };
};
