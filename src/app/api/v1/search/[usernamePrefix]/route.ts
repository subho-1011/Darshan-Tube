import { prismaDB } from "@/db/prisma";
import { createErrorResponse, createSuccessResponse } from "@/utils";

export async function GET(request: Request, { params }: { params: { usernamePrefix: string } }) {
    try {
        const { usernamePrefix } = params;
        if (!usernamePrefix) return createErrorResponse("Username prefix is required", 400);
        const usernames = await prismaDB.user.findMany({
            where: { username: { startsWith: usernamePrefix } },
        });

        return createSuccessResponse(usernames, "Usernames fetched successfully", 200);
    } catch (error) {
        return createErrorResponse("Failed to search users", 500, error);
    }
}
