"use client";

import { useRef, useState } from "react";

import { addToWatchHistory, addToWatchTime } from "@/services/watch-history.services";
import useVideoPlayerState from "./use-video-player-state";
import { useAppSelector } from "@/lib/utils";

const useVideoPlayer = () => {
    const { video } = useAppSelector((state) => state.videoPlayer);

    const [currentDuration, setCurrentDuration] = useState(0);
    const [lastUpdateDuration, setLastUpdateDuration] = useState(0);

    const intervalRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const hasAddedToWatchHistory = useRef(false); // Track if watch history was added

    // Handle watch history and update after intervals
    const handleWatchHistory = async (currentTime: number) => {
        if (!video?.id) return;

        // Initial start of the video - only add once
        if (!hasAddedToWatchHistory.current) {
            hasAddedToWatchHistory.current = true; // Set this to true to ensure it's not called again
            console.log("Initial start of the video at time:", currentTime);

            try {
                await addToWatchHistory(video.id);
                console.log("Watch history added at time:", currentTime);
            } catch (error) {
                console.error("Failed to add to watch history", error);
                // Reset if failed, to retry
                hasAddedToWatchHistory.current = false;
            }
        }

        // Only update if more than 5 seconds have passed since the last update
        const duration = currentTime - lastUpdateDuration;
        if (duration >= 10) {
            setLastUpdateDuration(currentTime);
            try {
                await addToWatchTime(video.id, duration, currentTime);
                console.log("Watch time updated:", duration, "at timestamp:", currentTime);
            } catch (error) {
                console.error("Failed to update watch time", error);
            }
        }
    };

    const startInterval = (videoElement: HTMLVideoElement) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear any existing interval
        }

        // Start the interval for updating watch time every second
        intervalRef.current = window.setInterval(() => {
            const currentTime = videoElement.currentTime;
            setCurrentDuration(currentTime);
            handleWatchHistory(currentTime);
        }, 1000 * 10);
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        console.log("Interval stopped.");
    };

    const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = e.currentTarget;
        setCurrentDuration(videoElement.currentTime);
    };

    // Handle when video is paused
    const handleVideoPause = async (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        if (!video?.id) return;

        const videoElement = e.currentTarget;
        const pausedAt = videoElement.currentTime;
        const durationWatched = pausedAt - lastUpdateDuration;
        setLastUpdateDuration(pausedAt);
        stopInterval();

        try {
            await addToWatchTime(video.id, durationWatched, pausedAt);
            console.log("Video paused at:", pausedAt, "Duration watched:", durationWatched);
        } catch (error) {
            console.error("Failed to update watch time on pause", error);
        }
    };

    // Handle when video ends
    const handleVideoEnded = async (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        if (!video?.id) return;

        stopInterval();
        const pausedAt = e.currentTarget.currentTime;
        const durationWatched = pausedAt - lastUpdateDuration;
        setLastUpdateDuration(pausedAt);

        try {
            await addToWatchTime(video.id, durationWatched, pausedAt, "DESKTOP", true);
            console.log("Video ended at:", currentDuration);
        } catch (error) {
            console.error("Failed to update watch time on end", error);
        }

        // Clean up
        setCurrentDuration(0);
        setLastUpdateDuration(0);
        hasAddedToWatchHistory.current = false; // Reset for the next video
    };

    // Handle when video is played
    const handleVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = e.currentTarget;
        startInterval(videoElement);

        if (!video?.id) return;

        if (!hasAddedToWatchHistory.current) {
            hasAddedToWatchHistory.current = true; // Set this to true to ensure it's not called again
            console.log("Initial start of the video at time:", currentDuration);
            try {
                addToWatchHistory(video.id);
                console.log("Watch history added at time:", currentDuration);
            } catch (error) {
                console.error("Failed to add to watch history", error);
                // Reset if failed, to retry
                hasAddedToWatchHistory.current = false;
            }
        }

        console.log("Video playing.");
    };

    return {
        video,
        videoRef,
        handleVideoTimeUpdate,
        handleVideoEnded,
        handleVideoPause,
        handleVideoPlay,
    };
};

export default useVideoPlayer;
