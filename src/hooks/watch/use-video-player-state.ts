"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import {
    resetVideoPlayer,
    setVideoSlug,
} from "@/store/slices/video-player-slice";
import { fetchVideoData } from "@/store/thunk-api/video-player.thunkapi";
import { fetchVideoCommentsThunk } from "@/store/thunk-api/video-comments.thunkapi";

const useVideoPlayerState = () => {
    const dispatch = useAppDispatch();

    const params = useParams();
    const slug = params.slug as string;

    const {
        videoSlug,
        video,
        videoError,
        videoLoading: isVideoLoading,
    } = useAppSelector((state) => state.videoPlayer);

    const { page, limit } = useAppSelector(
        (state) => state.videoPlayer.comments
    );

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (slug !== videoSlug) {
            dispatch(setVideoSlug(slug));

            console.log("Video slug changed:", slug);
        }
        console.log("Video slug:", slug);
    }, [slug]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (!videoSlug) return;
        dispatch(fetchVideoData({ slug: videoSlug })).then(() => {
            dispatch(fetchVideoCommentsThunk({ slug: videoSlug, page, limit }));
        });

        return () => {
            dispatch(resetVideoPlayer());
        };
    }, [videoSlug]);

    return {
        slug,
        video,
        isVideoLoading,
        videoError,
    };
};

export default useVideoPlayerState;
