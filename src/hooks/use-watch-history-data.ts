"use client";

import {
    deleteWatchHistoryThunk,
    getWatchHistoryThunk,
    loadMoreWatchHistoryThunk,
} from "@/store/thunk-api/watch-history.thunkapi";
import { useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";

const useWatchHistoryData = () => {
    const dispatch = useAppDispatch();

    const {
        videos,
        currentPage,
        limit,
        hasNoMoreVideos,
        watchHistoryLoading,
        watchHistoryError,
        loadMoreLoading,
        deleteWatchHistoryLoading,
        globalError,
    } = useAppSelector((state) => state.watchHistory);

    const memoizedVideos = useMemo(() => videos, [videos]);
    const memoizedGlobalError = useMemo(() => globalError, [globalError]);

    const loadMoreVideos = useCallback(() => {
        if (!hasNoMoreVideos) {
            dispatch(loadMoreWatchHistoryThunk({ page: currentPage + 1, limit }));
        }
    }, [dispatch, currentPage, limit, hasNoMoreVideos]);

    const handleWatchHistoryDelete = useCallback(
        (videoId: string) => {
            dispatch(deleteWatchHistoryThunk({ videoId }));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!watchHistoryLoading && videos === null) {
            dispatch(getWatchHistoryThunk());
        }
    }, [dispatch, watchHistoryLoading, videos]);

    return {
        videos: memoizedVideos,
        loadMoreVideos,
        handleWatchHistoryDelete,
        hasNoMoreVideos,
        isInitializeWatchHistory: watchHistoryLoading,
        isLoadMoreWatchHistory: loadMoreLoading,
        isDeletingWatchHistory: deleteWatchHistoryLoading,
        error: watchHistoryError || memoizedGlobalError.loadMoreWatchHistory || null,
    };
};

export default useWatchHistoryData;
