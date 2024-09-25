import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;
    try {
        const responseVideo = await prismaDB.video.findUnique({
            where: { slug },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                        subscriptions: {
                            select: {
                                userId: true,
                            },
                        },
                    },
                },
                likes: {
                    select: {
                        ownerId: true,
                    },
                },
                tags: {
                    select: {
                        tag: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!responseVideo) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        const userId = await getCurrentUserId();
        const isOwner = responseVideo?.owner.id === userId;
        const isLiked = responseVideo?.likes.some((like) => like.ownerId === userId);
        const isSubscribed = responseVideo?.owner.subscriptions.some(
            (sub) => sub.userId === userId
        );
        const likes = responseVideo?.likes.length || 0;
        const subscribers = responseVideo?.owner.subscriptions.length || 0;
        const tags = responseVideo?.tags.map((tag) => tag.tag.name);

        const video = {
            ...responseVideo,
            isOwner,
            isLiked,
            likes,
            tags,
            owner: {
                id: responseVideo?.owner.id,
                name: responseVideo?.owner.name,
                username: responseVideo?.owner.username,
                image: responseVideo?.owner.image,
                subscribers,
                isSubscribed,
            },
        };

        return NextResponse.json({ video, message: "Video fetched successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
