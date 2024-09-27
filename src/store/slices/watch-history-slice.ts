import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { watchHistoryState } from "@/types/store.typs";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constant";
import {
    deleteWatchHistoryThunk,
    getWatchHistoryThunk,
    loadMoreWatchHistoryThunk,
} from "../thunk-api/watch-history.thunkapi";

const initialState: watchHistoryState = {
    currentPage: parseInt(DEFAULT_PAGE),
    limit: parseInt(DEFAULT_LIMIT),
    videos: null,
    hasNoMoreVideos: false,
    watchHistoryLoading: false,
    watchHistoryError: null,
    loadMoreLoading: false,
    deleteWatchHistoryLoading: false,
    globalError: {},
};

const watchHistorySlice = createSlice({
    name: "watchHistory",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },

        resetWatchHistoryStore: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWatchHistoryThunk.pending, (state) => {
                state.watchHistoryLoading = true;
                state.watchHistoryError = null;
            })
            .addCase(getWatchHistoryThunk.fulfilled, (state, action) => {
                state.watchHistoryLoading = false;
                state.videos = action.payload.data;
            })
            .addCase(getWatchHistoryThunk.rejected, (state, action) => {
                state.watchHistoryLoading = false;
                state.watchHistoryError = action.error.message || "Failed to fetch watch history";
            });

        builder
            .addCase(loadMoreWatchHistoryThunk.pending, (state) => {
                state.loadMoreLoading = true;
                state.globalError["loadMoreWatchHistory"] = null;
            })
            .addCase(loadMoreWatchHistoryThunk.fulfilled, (state, action) => {
                state.loadMoreLoading = false;
                state.currentPage += 1;
                state.hasNoMoreVideos = action.payload.data.length === 0;
                state.videos = [...(state.videos || []), ...action.payload.data];
            })
            .addCase(loadMoreWatchHistoryThunk.rejected, (state, action) => {
                state.loadMoreLoading = false;
                state.globalError["loadMoreWatchHistory"] =
                    action.error.message || "Failed to load more watch history";
            });

        builder
            .addCase(deleteWatchHistoryThunk.pending, (state) => {
                state.globalError["deleteWatchHistory"] = null;
                state.deleteWatchHistoryLoading = true;
            })
            .addCase(deleteWatchHistoryThunk.fulfilled, (state, action) => {
                if (!state.videos) return;

                state.videos = state.videos.filter((video) => video.id !== action.meta.arg.videoId);
                state.deleteWatchHistoryLoading = false;
            })
            .addCase(deleteWatchHistoryThunk.rejected, (state, action) => {
                state.deleteWatchHistoryLoading = false;
                state.globalError["deleteWatchHistory"] =
                    action.error.message || "Failed to delete watch history";
            });
    },
});

export const { resetWatchHistoryStore } = watchHistorySlice.actions;

export default watchHistorySlice.reducer;
