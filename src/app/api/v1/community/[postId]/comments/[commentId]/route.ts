import { prismaDB } from "@/db/prisma";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessMessage, createSuccessResponse } from "@/utils";

export async function PATCH(req: NextRequest, { params }: { params: { postId: string; commentId: string } }) {
    try {
        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Community", 401);
        }

        const { postId, commentId } = params;
        if (!postId) {
            return createErrorResponse("Community id is required :: Community", 400);
        }

        const existingComment = await prismaDB.communityPostComment.findUnique({
            where: { id: commentId, communityId: postId },
        });

        if (!existingComment) {
            return createErrorResponse("Community post comment not found :: Community", 404);
        }

        if (existingComment.ownerId !== ownerId) {
            return createErrorResponse("You are not authorized to edit this community post comment :: Community", 403);
        }

        const { text } = await req.json();
        if (!text) {
            return createErrorResponse("Text is required :: Community", 400);
        }

        const updatedComment = await prismaDB.communityPostComment.update({
            where: { id: commentId },
            data: { text },
        });

        return createSuccessResponse(updatedComment, "Community post comment updated successfully :: Community");
    } catch (error) {
        return createErrorResponse("Failed to update community post comment", 500, error);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string; commentId: string } }) {
    try {
        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Community", 401);
        }

        const { postId, commentId } = params;
        if (!postId) {
            return createErrorResponse("Community id is required :: Community", 400);
        }

        const existingComment = await prismaDB.communityPostComment.findUnique({
            where: { id: commentId, communityId: postId },
            include: {
                communityPost: {
                    select: { ownerId: true },
                },
            },
        });

        if (!existingComment) {
            return createErrorResponse("Community post comment not found :: Community", 404);
        }

        if (existingComment.ownerId !== ownerId || existingComment.communityPost.ownerId !== ownerId) {
            return createErrorResponse(
                "You are not authorized to delete this community post comment :: Community",
                403
            );
        }

        await prismaDB.communityPostComment.delete({
            where: { id: commentId },
        });

        return createSuccessMessage("Community post comment deleted successfully :: Community");
    } catch (error) {
        return createErrorResponse("Failed to delete community post comment", 500, error);
    }
}
