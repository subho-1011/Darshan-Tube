import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { getACommunityPostCommentsThunk } from "@/store/thunk-api/community.thunkapi";

const useACommunityPostData = (postId: string) => {
    const dispatch = useAppDispatch();

    const communityPosts = useAppSelector((state) => state.community.posts);
    const postData = communityPosts.find((post) => post.id === postId);
    const isCommentsLoading = useAppSelector((state) => state.community.loading.fetchAPostComments);
    const errorMsg = useAppSelector((state) => state.community.error.fetchAPostComments);

    const [isLoading, setIsLoading] = useState(true);

    const fetchPostData = useCallback(() => {
        if (!postId) return;

        setIsLoading(true);

        if (postData) {
            dispatch(getACommunityPostCommentsThunk({ postId }));
            setIsLoading(false);
            return;
        }
    }, [postId]);

    useEffect(() => {
        fetchPostData();
    }, [fetchPostData]);

    return { postData, isLoading, isCommentsLoading, errorMsg };
};

export default useACommunityPostData;
