import { prismaDB } from "@/db/prisma";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessResponse, getPaginationParams } from "@/utils";

export async function GET(request: NextRequest) {
    try {
        const { page, limit } = getPaginationParams(request);

        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Get Watch History", 401);
        }

        const watchHistoryRecords = await prismaDB.watchHistory.findMany({
            where: { ownerId },
            select: {
                videoId: true,
                video: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        thumbnailUrl: true,
                        views: true,
                    },
                },
                session: {
                    select: {
                        timestamp: true,
                        watchedAt: true,
                    },
                    orderBy: { watchedAt: "desc" },
                    take: 1,
                },
            },
            orderBy: { updatedAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        });

        if (!watchHistoryRecords || watchHistoryRecords.length === 0) {
            return createSuccessResponse([], "No watch history found for the user", 200);
        }

        const watchHistory = watchHistoryRecords.map((record) => ({
            ...record.video,
            timestamp: record.session[0]?.timestamp || 0,
            watchedAt: record.session[0]?.watchedAt || null,
        }));

        return createSuccessResponse(watchHistory, "Watch history fetched successfully", 200);
    } catch (error) {
        return createErrorResponse("Failed to fetch watch history", 500, error);
    }
}
