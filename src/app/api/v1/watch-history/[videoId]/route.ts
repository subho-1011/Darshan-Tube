import { NextRequest, NextResponse } from "next/server";

import { prismaDB } from "@/db/prisma";
import { DEVICE } from "@prisma/client";

import { getCurrentUserId } from "@/data/users.data";
import { getVideoById, updateVideoViews } from "@/data/videos.data";
import { createErrorResponse, createSuccessMessage } from "@/utils";

const isWatchedInRecentTime = (watchedAt: Date) =>
    new Date().getTime() - new Date(watchedAt).getTime() < 3600 * 3;

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
    try {
        // get data - device from request
        const body = await request.json();
        const { device } = body;

        // Check if the video id is provided
        const { videoId } = params;
        if (!videoId) {
            return createErrorResponse("Video id is required :: Watch History", 400);
        }

        // Check if the video exists
        const video = await getVideoById(videoId);
        if (!video) {
            return createErrorResponse("Video not found :: Watch History", 404);
        }

        // Check if the user is authenticated
        const ownerId = await getCurrentUserId();

        let existingWatchHistory;
        if (ownerId) {
            // Add the video to the user's watch history
            existingWatchHistory = await prismaDB.watchHistory.findUnique({
                where: { ownerId_videoId: { videoId, ownerId } },
                include: {
                    session: {
                        orderBy: { watchedAt: "desc" },
                        take: 1,
                    },
                },
            });
        }

        if (existingWatchHistory) {
            const lastSession = existingWatchHistory.session[0];

            // if the last session is not from the same device or it is more than 12 hours ago then update video views
            if (
                lastSession &&
                (lastSession.device !== device || !isWatchedInRecentTime(lastSession.watchedAt))
            ) {
                await updateVideoViews(videoId);
            }

            return NextResponse.json(
                {
                    message: "Video already in watch history",
                },
                { status: 200 }
            );
        }

        // Update the video views
        await updateVideoViews(videoId);

        if (ownerId) {
            // Add the video to the user's watch history
            await prismaDB.watchHistory.create({
                data: {
                    videoId,
                    ownerId,
                    session: {
                        create: {
                            device: (device as DEVICE) || "DESKTOP",
                        },
                    },
                },
            });

            return createSuccessMessage("Video added to watch history");
        }

        return createSuccessMessage("Video added to watch history for public");
    } catch (error) {
        return createErrorResponse("Failed to add video to watch history", 500, error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { videoId: string } }) {
    const { duration, timeStamp, device, completed } = await request.json();

    const ownerId = await getCurrentUserId();
    if (!ownerId) {
        return createErrorResponse("User not authenticated :: Watch History", 401);
    }

    const { videoId } = params;
    if (!videoId) {
        return createErrorResponse("Video id is required :: Watch History", 400);
    }

    const video = await getVideoById(videoId);
    if (!video) {
        return createErrorResponse("Video not found :: Watch History", 404);
    }

    // validate timeStamp
    if (!timeStamp || isNaN(timeStamp) || timeStamp < 0) {
        return createErrorResponse("Invalid timeStamp :: Watch History", 400);
    }

    const deviceType = (DEVICE as Record<string, DEVICE>)[device] || "DESKTOP";

    const watchHistory = await prismaDB.watchHistory.findUnique({
        where: { ownerId_videoId: { videoId, ownerId } },
        include: {
            session: {
                orderBy: { watchedAt: "desc" },
                take: 1,
            },
        },
    });

    if (!watchHistory) {
        await prismaDB.watchHistory.create({
            data: {
                videoId,
                ownerId,
                session: {
                    create: {
                        device: deviceType,
                        duration,
                        timestamp: timeStamp,
                    },
                },
            },
        });

        // update video views
        await prismaDB.video.update({
            where: { id: videoId },
            data: {
                views: { increment: 1 },
            },
        });

        return createSuccessMessage("Watch history updated :: session started successfully", 200);
    }

    const lastSession = watchHistory?.session[0];

    if (!lastSession || lastSession.completed) {
        // create new session
        await prismaDB.watchSession.create({
            data: {
                watchHistoryId: watchHistory.id,
                device: deviceType,
                duration,
                timestamp: timeStamp,
                completed: !!completed,
            },
        });

        // update video views
        await updateVideoViews(videoId);
        return createSuccessMessage("Watch history updated :: session started successfully", 200);
    }

    if (
        !lastSession.completed &&
        isWatchedInRecentTime(lastSession.watchedAt) &&
        lastSession.device === deviceType
    ) {
        // update session
        await prismaDB.watchSession.update({
            where: { id: lastSession.id },
            data: {
                duration: { increment: duration },
                timestamp: timeStamp,
                completed: !!completed,
            },
        });

        return completed
            ? createSuccessMessage("Session completed successfully", 200)
            : createSuccessMessage("Session updated successfully", 200);
    }

    // create new session
    await prismaDB.watchSession.create({
        data: {
            watchHistoryId: watchHistory.id,
            device: deviceType,
            duration,
            timestamp: timeStamp,
            completed: !!completed,
        },
    });

    // update video views
    await updateVideoViews(videoId);

    return createSuccessMessage("Watch history updated :: session started successfully", 200);
}
