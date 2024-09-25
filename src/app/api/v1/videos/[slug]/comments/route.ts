import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        // validate slug
        if (!slug) {
            return NextResponse.json({ message: "Video slug not found" }, { status: 400 });
        }

        // find video by slug
        const video = await prismaDB.video.findUnique({ where: { slug } });
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        const { searchParams } = request.nextUrl;

        const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`, 10);
        const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);
        const sortBy = searchParams.get("sortBy") || "newest";

        if (isNaN(page) || page < 1) {
            return NextResponse.json({ message: "Page number is not valid" }, { status: 400 });
        }

        if (isNaN(limit) || limit < 1) {
            return NextResponse.json({ message: "Limit is not valid" }, { status: 400 });
        }

        const skip = (page - 1) * limit;
        let orderBy = {};
        switch (sortBy) {
            case "oldest":
                orderBy = { createdAt: "asc" };
            case "mostViews":
                orderBy = { views: "desc" };
            case "mostLikes":
                orderBy = { likes: { _count: "desc" } };
            case "newest":
                orderBy = { createdAt: "desc" };
            default:
                orderBy = { createdAt: "desc" };
        }

        const responseComments = await prismaDB.videoComment.findMany({
            where: { videoId: video.id },
            orderBy,
            skip,
            take: limit,
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                    },
                },
                likes: { select: { ownerId: true } },
                replies: true,
            },
        });

        if (responseComments.length === 0) {
            return NextResponse.json(
                {
                    comments: [],
                    totalComments: 0,
                    message: "No comments found for this video",
                },
                { status: 200 }
            );
        }

        const totalComments = await prismaDB.videoComment.count({ where: { videoId: video.id } });

        const userId = await getCurrentUserId();

        const comments = responseComments.map((comment) => {
            return {
                id: comment.id,
                text: comment.text,
                createdAt: comment.createdAt,
                parentCommentId: comment.parentCommentId || null,
                isOwner: comment.ownerId === userId,
                isLiked: comment.likes.some((like) => like.ownerId === userId),
                likes: comment.likes.length,
                noOfReplies: comment.replies.length,
                owner: {
                    id: comment.owner.id,
                    name: comment.owner.name,
                    username: comment.owner.username,
                    image: comment.owner.image,
                },
            };
        });

        return NextResponse.json(
            {
                comments,
                totalComments,
                message: "Comments fetched successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        // validate slug
        if (!slug) {
            return NextResponse.json({ message: "Video slug not found" }, { status: 400 });
        }

        // find video by slug
        const video = await prismaDB.video.findUnique({ where: { slug } });
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        const body = await request.json();

        if (!body.text) {
            return NextResponse.json({ message: "Text is required" }, { status: 400 });
        }

        const userId = await getCurrentUserId();

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const newComment = await prismaDB.videoComment.create({
            data: {
                text: body.text,
                videoId: video.id,
                ownerId: userId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                comment: {
                    ...newComment,
                    isOwner: newComment.ownerId === userId,
                    isLiked: false,
                    likes: 0,
                    noOfReplies: 0,
                },
                message: "Comment created successfully",
            },
            { status: 201 }
        );
    } catch (error: any) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
