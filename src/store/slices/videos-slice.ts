import { TVideo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTotalVideos, fetchVideos } from "@/store/async-thunk-api/videos";

type ErrorType = "fetchVideos" | "fetchTotalVideos";

interface PageVideos {
    videos: TVideo[];
}

export interface VideosState {
    totalPages: number;
    currentPage: number;
    limit: number;
    pages: Record<number, PageVideos>;
    error: Record<ErrorType, string | null>;
    loading: {
        fetchVideos: boolean;
        fetchTotalVideos: boolean;
    };
    prefetching: boolean;
}

const initialVideoState: VideosState = {
    totalPages: 0,
    currentPage: 1,
    limit: 1, // Set default limit to a more commonly used value.
    pages: {},
    error: {
        fetchVideos: null,
        fetchTotalVideos: null,
    },
    loading: {
        fetchVideos: false,
        fetchTotalVideos: false,
    },
    prefetching: false,
};

const videosSlice = createSlice({
    name: "videos",
    initialState: initialVideoState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        nextPage: (state) => {
            state.currentPage += 1;
        },
        previousPage: (state) => {
            state.currentPage -= 1;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        resetError: (state, action: PayloadAction<ErrorType>) => {
            state.error[action.payload] = null;
        },

        resetVideoStore: () => {
            return { ...initialVideoState };
        },
    },
    extraReducers: (builder) => {
        // Fetch Total Videos Reducers
        builder
            .addCase(fetchTotalVideos.pending, (state) => {
                state.loading.fetchTotalVideos = true;
                state.error.fetchTotalVideos = null;
            })
            .addCase(fetchTotalVideos.fulfilled, (state, action) => {
                state.loading.fetchTotalVideos = false;
                state.totalPages = Math.ceil(action.payload.totalVideos / state.limit);
                state.error.fetchTotalVideos = null;
            })
            .addCase(fetchTotalVideos.rejected, (state, action) => {
                state.loading.fetchTotalVideos = false;
                state.error.fetchTotalVideos =
                    action.error.message || "Failed to fetch total videos.";
            });

        builder
            // Fetch Videos Reducers
            .addCase(fetchVideos.pending, (state, action) => {
                if (action.meta.arg.pageNumber === state.currentPage) {
                    state.loading.fetchVideos = true;
                } else {
                    state.prefetching = true;
                }
                state.error.fetchVideos = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading.fetchVideos = false;
                state.prefetching = false;
                state.pages[state.currentPage] = { videos: action.payload.videos };
                state.error.fetchVideos = null;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading.fetchVideos = false;
                state.prefetching = false;
                state.error.fetchVideos = action.error.message || "Failed to fetch videos.";
            });
    },
});

// Export actions
export const { setCurrentPage, nextPage, previousPage, setLimit, resetError, resetVideoStore } =
    videosSlice.actions;

export default videosSlice.reducer;
