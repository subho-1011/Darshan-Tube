"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchTotalVideos, fetchVideos } from "@/store/thunk-api/videos";
import {
    nextPage,
    previousPage,
    resetVideoStore,
    setCurrentPage,
} from "@/store/slices/videos-slice";

export const useHomePage = () => {
    const dispatch = useAppDispatch();
    const { totalPages, pages, loading, currentPage, limit, error } = useAppSelector(
        (state) => state.videos
    );

    const [initialRender, setInitialRender] = useState(true);
    const [sortBy, setSortBy] = useState<string>("");

    const selectSortBy = (sort: string) => {
        setSortBy(sort);
        dispatch(resetVideoStore());
        setInitialRender(true);
    };

    // Fetch total videos on initial render
    useEffect(() => {
        if (initialRender) {
            dispatch(fetchTotalVideos());
            setInitialRender(false);
        }
    }, [initialRender, dispatch]);

    useEffect(() => {
        if (!pages[currentPage]?.videos) {
            dispatch(fetchVideos({ pageNumber: currentPage, limit, sortBy }));
        }
    }, [currentPage, dispatch, totalPages, limit]);

    const paginate = (pageNumber: number) => dispatch(setCurrentPage(pageNumber));
    const goToNextPage = () => dispatch(nextPage());
    const goToPreviousPage = () => dispatch(previousPage());

    return {
        totalPages,
        currentPage,
        limit,
        pages,
        paginate,
        goToNextPage,
        goToPreviousPage,
        error: error.fetchTotalVideos || error.fetchVideos,
        isLoading: loading.fetchTotalVideos || loading.fetchVideos,
        sortBy,
        selectSortBy,
    };
};
