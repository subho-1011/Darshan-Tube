"use client";

import { useAppSelector } from "@/lib/utils";

const useVideoCommentsState = () => {
    const { loading } = useAppSelector((state) => state.videoPlayer);

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
