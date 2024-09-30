import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessMessage } from "@/utils";

export async function POST(req: Request, { params }: { params: { postId: string; commentId: string } }) {
    try {
        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Community", 401);
        }

        const { postId, commentId } = params;
        if (!postId) {
            return createErrorResponse("Community id is required :: Community", 400);
        }

        if (!commentId) {
            return createErrorResponse("Comment id is required :: Community", 400);
        }

        const existingComment = await prismaDB.communityPostComment.findUnique({
            where: { id: commentId, communityId: postId },
        });

        if (!existingComment) {
            return createErrorResponse("Community post comment not found :: Community", 404);
        }

        //like by user already exists
        const existingLike = await prismaDB.communityCommentLike.findUnique({
            where: { ownerId_communityCommentId: { ownerId, communityCommentId: commentId } },
        });

        if (existingLike) {
            await prismaDB.communityCommentLike.delete({
                where: { ownerId_communityCommentId: { ownerId, communityCommentId: commentId } },
            });
        } else {
            await prismaDB.communityCommentLike.create({
                data: {
                    ownerId,
                    communityCommentId: commentId,
                },
            });
        }

        return createSuccessMessage("Community post comment like toggled :: Community");
    } catch (error) {
        return createErrorResponse("Failed to toggle community post comment like", 500, error);
    }
}
