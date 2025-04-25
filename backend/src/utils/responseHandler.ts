import { Response } from "express";
import logger from "./logger";

export const responseHandler = (
    res: Response,
    result: { success: boolean; error?: string; data?: any },
    method: "POST" | "GET" | "PUT" | "DELETE" = "GET" // Default to GET
) => {
    const statusCode = result.success
        ? method === "POST"
            ? 201 //  Return 201 Created for successful POST requests
            : 200 //  Return 200 OK for successful GET, PUT, DELETE
        : result.error === "User not found."
        ? 404
        : result.error === "Email already exists."
        ? 409 //  Keep 409 Conflict for duplicate emails
        : result.error === "Error fetching users."
        ? 500
        : 400; // Default to 400 Bad Request for other failures

    // Log the response
    if (result.success) {
        logger.success(`[${method}] ${statusCode} - Success`, result.data);
    } else {
        logger.error(`[${method}] ${statusCode} - Error: ${result.error}`);
    }

    res.status(statusCode).json({
        statusCode,
        ...(result.success
            ? { message: "Operation successful", data: result.data }
            : { error: result.error }),
    });
};
