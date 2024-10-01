"use client";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchInitialCommunityPosts, loadMoreCommunityPosts } from "@/store/thunk-api/community.thunkapi";
import { useEffect } from "react";

const useCommunityData = () => {
    const dispatch = useAppDispatch();
    const { posts, currentPage, hasNoMorePosts, loading } = useAppSelector((state) => state.community);

    useEffect(() => {
        dispatch(fetchInitialCommunityPosts({ page: 1, limit: 1 }));
    }, []);

    const loadMorePosts = () => {
        dispatch(loadMoreCommunityPosts({ page: currentPage + 1, limit: 1 }));
    };

    return {
        posts,
        loadMorePosts,
        hasNoMorePosts,
        initialLoading: loading.fetchInitialPosts,
        loadMoreLoading: loading.loadMorePosts,
    };
};

export default useCommunityData;
