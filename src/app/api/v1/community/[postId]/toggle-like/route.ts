import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessMessage } from "@/utils";

export async function POST(req: Request, { params }: { params: { postId: string } }) {
    try {
        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Community", 401);
        }

        const { postId } = params;
        if (!postId) {
            return createErrorResponse("Community id is required :: Community", 400);
        }

        const existingPost = await prismaDB.communityPost.findUnique({
            where: { id: postId },
        });
        if (!existingPost) {
            return createErrorResponse("Community post not found :: Community", 404);
        }

        const existingLike = await prismaDB.communityPostLike.findUnique({
            where: { ownerId_communityId: { ownerId, communityId: postId } },
        });

        if (existingLike) {
            await prismaDB.communityPostLike.delete({
                where: { ownerId_communityId: { ownerId, communityId: postId } },
            });

            return createSuccessMessage("Community post liked toggled successfully");
        }

        await prismaDB.communityPostLike.create({
            data: {
                ownerId,
                communityId: postId,
            },
        });

        return createSuccessMessage("Community post liked successfully");
    } catch (error) {
        return createErrorResponse("Failed to like community post", 500, error);
    }
}
