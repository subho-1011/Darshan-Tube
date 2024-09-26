"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/lib/utils";
import {
    addToWatchHistory,
    addToWatchTime,
} from "@/services/watch-history.services";

const useVideoPlayer = () => {
    const { video } = useAppSelector((state) => state.videoPlayer);

    const intervalRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const lastUpdateDurationRef = useRef<number | null>(null);
    const hasAddedToWatchHistory = useRef(false);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // upadate last update time
    const handleWatchHistory = useCallback(
        async (currentTime: number) => {
            if (!video?.id) return;

            if (!hasAddedToWatchHistory.current) {
                hasAddedToWatchHistory.current = true;

                try {
                    await addToWatchHistory(video.id);
                } catch (error) {
                    hasAddedToWatchHistory.current = false;
                    console.error(error);
                }
            }

            if (!lastUpdateDurationRef.current) {
                lastUpdateDurationRef.current = currentTime;
                return;
            }

            const duration = currentTime - lastUpdateDurationRef.current;
            if (duration >= 20) {
                lastUpdateDurationRef.current = currentTime;
                await addToWatchTime(video.id, duration, currentTime);
            }
        },
        [video?.id]
    );

    const startInterval = useCallback(
        (videoElement: HTMLVideoElement) => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = window.setInterval(() => {
                const currentTime = videoElement.currentTime;
                handleWatchHistory(currentTime);
            }, 1000);
        },
        [handleWatchHistory]
    );

    const handleVideoPause = useCallback(async () => {
        const pausedAt = videoRef.current?.currentTime;

        if (!video?.id || !pausedAt) return;

        const durationWatched = pausedAt - (lastUpdateDurationRef.current || 0);
        lastUpdateDurationRef.current = pausedAt;
        stopInterval();

        try {
            await addToWatchTime(video.id, durationWatched, pausedAt);
        } catch (error) {
            console.error(error);
        }
    }, [video?.id, stopInterval]);

    // Handle when video ends
    const handleVideoEnded = useCallback(async () => {
        const pausedAt = videoRef.current?.currentTime;

        if (!video?.id || !pausedAt) return;

        const durationWatched = pausedAt - (lastUpdateDurationRef.current || 0);
        lastUpdateDurationRef.current = pausedAt;

        try {
            await addToWatchTime(
                video.id,
                durationWatched,
                pausedAt,
                "DESKTOP",
                true
            );
        } catch (error) {
            console.error(error);
        }

        stopInterval();

        // Clean up
        lastUpdateDurationRef.current = null;
        hasAddedToWatchHistory.current = false; // Reset for the next video
    }, [video?.id, stopInterval]);

    const handleVideoPlay = useCallback(
        (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
            const videoElement = e.currentTarget;
            startInterval(videoElement);

            if (!video?.id) return;

            if (!hasAddedToWatchHistory.current) {
                hasAddedToWatchHistory.current = true;

                try {
                    addToWatchHistory(video.id);
                } catch (error) {
                    hasAddedToWatchHistory.current = false;
                    console.error(error);
                }
            }
        },
        [video?.id, startInterval]
    );

    useEffect(() => {
        return () => {
            stopInterval();
            videoRef.current = null;
            lastUpdateDurationRef.current = null;
        };
    }, [stopInterval]);

    return {
        video,
        videoRef,
        handleVideoEnded,
        handleVideoPause,
        handleVideoPlay,
    };
};

export default useVideoPlayer;
