import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchVideoCommentsThunk } from "@/store/thunk-api/video-comments.thunkapi";

const useVideoCommentsState = () => {
    const dispatch = useAppDispatch();
    const { videoSlug: slug, loading } = useAppSelector((state) => state.videoPlayer);

    const isLoadMoreComments = loading["loadMoreVideoComments"];
    const isPostingNewComment = loading["postVideoComment"];
    const isUpdatingComment = loading["editVideoComment"];
    const isDeletingComment = loading["deleteVideoComment"];

    const {
        page,
        limit,
        comments,
        totalComments,
        commentsLoading: isCommentsLoading,
        commentsError,
    } = useAppSelector((state) => state.videoPlayer.comments);

    const loadCommentsData = useCallback(() => {
        if (slug) {
            dispatch(fetchVideoCommentsThunk({ slug, page, limit }));
        }
    }, [slug]);

    useEffect(() => {
        loadCommentsData();
    }, [loadCommentsData]);

    return {
        comments,
        totalComments,
        commentsPage: page,
        commentsLimit: limit,
        isCommentsLoading,
        commentsError,
        isPostingNewComment,
        isUpdatingComment,
        isDeletingComment,
        isLoadMoreComments,
    };
};

export default useVideoCommentsState;
