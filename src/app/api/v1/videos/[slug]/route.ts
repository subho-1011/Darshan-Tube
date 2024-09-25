import { prismaDB } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
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
        const tags = responseVideo?.tags.map((tag) => tag.tag.name);

        const likes = await prismaDB.videoLike.count({
            where: { videoId: responseVideo?.id },
        });

        const isLiked =
            userId &&
            (await prismaDB.videoLike.findUnique({
                where: { ownerId_videoId: { ownerId: userId, videoId: responseVideo?.id } },
            }));

        const subscribers = await prismaDB.subscription.count({
            where: { channelId: responseVideo?.owner.id },
        });

        const isSubscribed =
            userId &&
            (await prismaDB.subscription.findUnique({
                where: { userId_channelId: { userId, channelId: responseVideo?.owner.id } },
            }));

        const video = {
            ...responseVideo,
            isOwner,
            isLiked,
            likes,
            tags,
            isSubscribed: !!isSubscribed,
            owner: {
                id: responseVideo?.owner.id,
                name: responseVideo?.owner.name,
                username: responseVideo?.owner.username,
                image: responseVideo?.owner.image,
                subscribers: subscribers || 0,
            },
        };

        return NextResponse.json({ video, message: "Video fetched successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
