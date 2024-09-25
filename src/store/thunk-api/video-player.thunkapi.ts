import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVideoDataBySlug } from "@/services/video-player.services";
import { toggleVideoLikeBySlug } from "@/services/likes.services";

// Fetch video data using slug
const fetchVideoData = createAsyncThunk(
    "video/fetchVideoData",
    async ({ slug }: { slug: string }) => {
        return await getVideoDataBySlug(slug);
    }
);

// Toggle video like
const toggleVideoLike = createAsyncThunk(
    "videoPlayer/toggleVideoLike",
    async ({ slug }: { slug: string }) => {
        return await toggleVideoLikeBySlug(slug);
    }
);

export { fetchVideoData, toggleVideoLike };
