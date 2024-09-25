"use client";

import React from "react";

import { FaThumbsUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { toggleVideoLike } from "@/store/thunk-api/video-player.thunkapi";

const VideoLikedButton = () => {
    const dispatch = useAppDispatch();

    const { video } = useAppSelector((state) => state.videoPlayer);

    const slug = video?.slug || "";
    const isLiked = video?.isLiked || false;

    const handleVideoLike = () => dispatch(toggleVideoLike({ slug }));

    return (
        <Button variant={isLiked ? "default" : "outline"} onClick={handleVideoLike}>
            {isLiked ? <FaThumbsUp size={16} className="fill-current" /> : <FaThumbsUp size={16} />}
            <span className="ml-2">{video?.likes}</span>
        </Button>
    );
};

export default VideoLikedButton;
