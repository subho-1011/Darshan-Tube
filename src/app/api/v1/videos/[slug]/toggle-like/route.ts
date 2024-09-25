import { prismaDB } from "@/db/prisma";
import { getCurrentUserId } from "@/data/users.data";
import { NextRequest, NextResponse } from "next/server";

// API to toggle like on a video
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        // Check if the video slug is provided
        if (!slug) {
            return NextResponse.json({ message: "Video slug is required" }, { status: 400 });
        }

        // Check if the user is authenticated
        const userId = await getCurrentUserId();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        // Find the video by slug
        const video = await prismaDB.video.findUnique({ where: { slug } });
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        // Check if the user has already liked the video
        const existingLike = await prismaDB.videoLike.findUnique({
            where: {
                ownerId_videoId: {
                    videoId: video.id,
                    ownerId: userId,
                },
            },
        });

        // Toggle logic: if already liked, remove like; if not, create like
        if (existingLike) {
            await prismaDB.videoLike.delete({
                where: {
                    ownerId_videoId: {
                        videoId: video.id,
                        ownerId: userId,
                    },
                },
            });
            return NextResponse.json(
                {
                    liked: false,
                    message: "Like removed successfully",
                },
                { status: 200 }
            );
        } else {
            await prismaDB.videoLike.create({
                data: {
                    videoId: video.id,
                    ownerId: userId,
                },
            });
            return NextResponse.json(
                {
                    liked: true,
                    message: "Like added successfully",
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
