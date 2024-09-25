"use client";

import React from "react";

import { FaThumbsUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/lib/utils";
import { toggleVideoLike } from "@/store/thunk-api/video-player.thunkapi";

const VideoLikedButton: React.FC<{
    slug: string;
    isLiked: boolean;
    likes: number;
}> = ({ slug, isLiked, likes }) => {
    const dispatch = useAppDispatch();

    const handleVideoLike = () => dispatch(toggleVideoLike({ slug }));

    return (
        <Button
            variant={isLiked ? "default" : "outline"}
            onClick={handleVideoLike}
        >
            {isLiked ? (
                <FaThumbsUp size={16} className="fill-current" />
            ) : (
                <FaThumbsUp size={16} />
            )}
            <span className="ml-2">{likes}</span>
        </Button>
    );
};

export default VideoLikedButton;
