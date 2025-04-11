import { prisma } from "../db/prisma";
import { ServiceResponse } from "../types/types";
import { handlePrismaRequestError } from "../utils/errorHandler";
import logger from "../utils/logger";
import {
    checkRequiredFields,
    emailFormattingCheck,
} from "../utils/inputValidation";
import { User } from "../types/types";

export const UserService = {
    async createUser(
        id: string,
        name: string,
        email: string
    ): Promise<ServiceResponse<User>> {
        const requiredCheck = checkRequiredFields(
            { key: "name", value: name },
            { key: "email", value: email }
        );
        if (!requiredCheck.success)
            return {
                success: false,
                error: requiredCheck.error || "Missing required fields",
            };

        const emailCheck = emailFormattingCheck(email);
        if (!emailCheck.success) {
            return {
                success: false,
                error: emailCheck.error || "Invalid email format.",
            };
        }

        try {
            const user = await prisma.user.create({
                data: { id, name, email, role: "USER" },
            });

            await logger.success(
                `[UserService] User created successfully:`,
                user.email
            );

            return { success: true, data: user as User };
        } catch (error) {
            return handlePrismaRequestError(error, "creating user");
        }
    },
};
