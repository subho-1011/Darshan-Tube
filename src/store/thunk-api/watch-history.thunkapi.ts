import { deleteWatchHistory, fetchWatchHistory } from "@/services/watch-history.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getWatchHistoryThunk = createAsyncThunk("watchHistory/getWatchHistory", async () => {
    return await fetchWatchHistory();
});

// load more watch history
const loadMoreWatchHistoryThunk = createAsyncThunk(
    "watchHistory/loadMoreWatchHistory",
    async ({ page, limit }: { page: number; limit: number }) => {
        return await fetchWatchHistory(page, limit);
    }
);

// delete watch history
const deleteWatchHistoryThunk = createAsyncThunk(
    "watchHistory/deleteWatchHistory",
    async ({ videoId }: { videoId: string }) => {
        return await deleteWatchHistory(videoId);
    }
);

export { getWatchHistoryThunk, loadMoreWatchHistoryThunk, deleteWatchHistoryThunk };
