"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { resetVideoPlayer, setVideoSlug } from "@/store/slices/video-player-slice";
import { fetchVideoData } from "@/store/thunk-api/video-player.thunkapi";

const useVideoPlayerState = () => {
    const dispatch = useAppDispatch();

    const params = useParams();
    const slug = params.slug as string;

    const {
        video,
        videoError,
        videoLoading: isVideoLoading,
    } = useAppSelector((state) => state.videoPlayer);

    useEffect(() => {
        dispatch(setVideoSlug(slug));
    }, []);

    console.log("slug", slug);
    useEffect(() => {
        dispatch(fetchVideoData({ slug }));

        return () => {
            dispatch(resetVideoPlayer());
        };
    }, [slug, dispatch]);

    return {
        slug,
        video,
        isVideoLoading,
        videoError,
    };
};

export default useVideoPlayerState;
