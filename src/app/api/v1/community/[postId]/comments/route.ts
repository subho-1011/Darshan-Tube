import { prismaDB } from "@/db/prisma";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/data/users.data";
import { createErrorResponse, createSuccessResponse } from "@/utils";

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
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

        const comments = await prismaDB.communityPostComment.findMany({
            where: { communityId: postId },
            orderBy: { createdAt: "desc" },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    },
                },
                likes: {
                    select: {
                        ownerId: true,
                    },
                },
            },
        });

        if (!comments || comments.length === 0) {
            return createSuccessResponse([], "Community comments fetched successfully");
        }

        const currentUserId = await getCurrentUserId();

        return createSuccessResponse(
            {
                comments: comments.map((comment) => ({
                    ...comment,
                    isLiked: comment.likes.some((like) => like.ownerId === currentUserId),
                    likes: comment.likes.length,
                    isOwner: comment.ownerId === currentUserId,
                })),
            },
            "Community comments fetched successfully"
        );
    } catch (error) {
        return createErrorResponse("Failed to get community comments", 500, error);
    }
}

// post comment on community post
export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
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

        const { text } = await req.json();
        if (!text) {
            return createErrorResponse("Text is required :: Community", 400);
        }

        const comment = await prismaDB.communityPostComment.create({
            data: {
                text,
                communityId: postId,
                ownerId: (await getCurrentUserId())!,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    },
                },
            },
        });

        return createSuccessResponse(
            {
                ...comment,
                likes: 0,
                isLiked: false,
                isOwner: true,
            },
            "Community comment created successfully"
        );
    } catch (error) {
        return createErrorResponse("Failed to create community comment", 500, error);
    }
}
