import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessResponse, getPaginationParams } from "@/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { page, limit } = getPaginationParams(request);

        const userId = await getCurrentUserId();
        if (!userId) return createErrorResponse("User not authenticated :: Liked Videos", 401);

        const likedVideos = await prismaDB.videoLike.findMany({
            where: { ownerId: userId },
            orderBy: { createdAt: "desc" },
            select: {
                video: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        thumbnailUrl: true,
                        views: true,
                        createdAt: true,
                        owner: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        if (!likedVideos) return createErrorResponse("Liked videos not found", 404);

        const videos = likedVideos.map((video) => video.video);

        return createSuccessResponse(videos, "Your liked videos retrieved successfully");
    } catch (error) {
        return createErrorResponse("Something went wrong", 500, error);
    }
}
