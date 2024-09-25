import { NextRequest, NextResponse } from "next/server";

import { prismaDB } from "@/db/prisma";
import { DEVICE } from "@prisma/client";

import { getCurrentUserId } from "@/data/users.data";
import { getVideoById, updateVideoViews } from "@/data/videos.data";

const isLessThanTwelveHours = (watchedAt: Date) =>
    new Date().getTime() - new Date(watchedAt).getTime() < 1000 * 60 * 60 * 12;

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
    try {
        const { videoId } = params;

        // get data - device from request
        const body = await request.json();
        const { device } = body;

        // Check if the video id is provided
        if (!videoId) {
            return NextResponse.json({ message: "Video id is required" }, { status: 400 });
        }

        // Check if the video exists
        const video = await getVideoById(videoId);
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        // Check if the user is authenticated
        const userId = await getCurrentUserId();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        // Add the video to the user's watch history
        const existingWatchHistory = await prismaDB.watchHistory.findUnique({
            where: { ownerId_videoId: { videoId, ownerId: userId } },
            include: {
                session: {
                    orderBy: { watchedAt: "desc" },
                    take: 1,
                },
            },
        });

        if (existingWatchHistory) {
            const lastSession = existingWatchHistory.session[0];

            // if the last session is not from the same device or it is more than 12 hours ago then update video views
            if (
                lastSession &&
                (lastSession.device !== device || !isLessThanTwelveHours(lastSession.watchedAt))
            ) {
                await updateVideoViews(videoId);
            }

            return NextResponse.json(
                { watchHistory: existingWatchHistory, message: "Video already in watch history" },
                { status: 200 }
            );
        }

        // Add the video to the user's watch history
        const watchHistory = await prismaDB.watchHistory.create({
            data: {
                videoId,
                ownerId: userId,
                session: {
                    create: {
                        device: (device as DEVICE) || "DESKTOP",
                    },
                },
            },
        });

        // Update the video views
        await updateVideoViews(videoId);

        return NextResponse.json(
            { watchHistory, message: "Video added to watch history" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("ERROR :: WATCH HISTORY POST :", error.message);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { videoId: string } }) {
    const { videoId } = params;
    const { duration, timeStamp, device, completed } = await request.json();
    const ownerId = await getCurrentUserId();

    if (!ownerId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    if (!videoId) {
        return NextResponse.json({ message: "Video id is required" }, { status: 400 });
    }

    if (typeof timeStamp !== "number" || typeof duration !== "number") {
        return NextResponse.json(
            { message: "Timestamp and duration are required" },
            { status: 400 }
        );
    }

    const deviceType = (DEVICE as Record<string, DEVICE>)[device] || "DESKTOP";

    let watchHistory = await prismaDB.watchHistory.findUnique({
        where: { ownerId_videoId: { videoId, ownerId } },
        include: { session: true },
    });

    if (!watchHistory) {
        watchHistory = await prismaDB.watchHistory.create({
            data: {
                videoId,
                ownerId,
                session: { create: { device: deviceType } },
            },
            include: { session: true },
        });
    }

    const lastSession = watchHistory?.session[watchHistory.session.length - 1];

    if (!lastSession) {
        const updatedWatchHistory = await prismaDB.watchHistory.update({
            where: { ownerId_videoId: { videoId, ownerId } },
            data: {
                session: {
                    create: {
                        device: deviceType,
                        duration,
                        timestamp: timeStamp,
                    },
                },
            },
            select: {
                session: {
                    orderBy: {
                        watchedAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        return NextResponse.json(
            {
                watchedSession: updatedWatchHistory.session[0],
                message: "Video started successfully",
            },
            { status: 200 }
        );
    }

    if (completed) {
        const updatedWatchHistory = await prismaDB.watchHistory.update({
            where: { ownerId_videoId: { videoId, ownerId } },
            data: {
                session: {
                    update: {
                        where: { id: lastSession.id },
                        data: {
                            duration: { increment: duration },
                            timestamp: timeStamp,
                            completed: true,
                        },
                    },
                },
            },
            select: {
                session: {
                    orderBy: {
                        watchedAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        return NextResponse.json(
            {
                watchedSession: updatedWatchHistory.session[0],
                message: "Video completed successfully",
            },
            { status: 200 }
        );
    }

    if (
        lastSession &&
        !lastSession.completed &&
        isLessThanTwelveHours(lastSession.watchedAt) &&
        lastSession.device === deviceType
    ) {
        const updatedWatchHistory = await prismaDB.watchHistory.update({
            where: { ownerId_videoId: { videoId, ownerId } },
            data: {
                session: {
                    update: {
                        where: { id: lastSession.id },
                        data: {
                            duration: { increment: duration },
                            timestamp: timeStamp,
                        },
                    },
                },
            },
            select: {
                session: {
                    orderBy: {
                        watchedAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        return NextResponse.json(
            {
                watchedSession: updatedWatchHistory.session[0],
                message: "Video updated successfully",
            },
            { status: 200 }
        );
    }

    const updatedWatchHistory = await prismaDB.watchHistory.update({
        where: { ownerId_videoId: { videoId, ownerId } },
        data: {
            session: {
                create: {
                    duration,
                    timestamp: timeStamp,
                    device: deviceType,
                },
            },
        },
        select: {
            session: {
                orderBy: {
                    watchedAt: "desc",
                },
                take: 1,
            },
        },
    });

    return NextResponse.json(
        {
            watchedSession: updatedWatchHistory.session[0],
            message: "Video started successfully",
        },
        { status: 200 }
    );
}
