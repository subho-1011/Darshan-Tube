import { prismaDB } from "@/db/prisma";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessMessage, createSuccessResponse } from "@/utils";

export async function PATCH(req: NextRequest, { params }: { params: { postId: string } }) {
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

        if (existingPost.ownerId !== ownerId) {
            return createErrorResponse("You are not authorized to update this community post :: Community", 403);
        }

        const { text } = await req.json();
        if (!text) {
            return createErrorResponse("Text is required :: Community", 400);
        }

        const updatedPost = await prismaDB.communityPost.update({
            where: { id: postId },
            data: { text },
        });

        return createSuccessResponse(updatedPost, "Community post updated successfully");
    } catch (error) {
        return createErrorResponse("Failed to update community post", 500, error);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
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

        if (existingPost.ownerId !== ownerId) {
            return createErrorResponse("You are not authorized to delete this community post :: Community", 403);
        }

        await prismaDB.communityPost.delete({
            where: { id: postId },
        });

        return createSuccessMessage("Community post deleted successfully");
    } catch (error) {
        return createErrorResponse("Failed to delete community post", 500, error);
    }
}
