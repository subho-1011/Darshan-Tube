"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { incrementCommentsPage } from "@/store/slices/video-player-slice";
import {
    deleteVideoCommentThunk,
    editVideoCommentThunk,
    loadMoreVideoCommentsThunk,
    postVideoCommentThunk,
} from "@/store/thunk-api/video-comments.thunkapi";

const useVideoCommentsActions = () => {
    const dispatch = useAppDispatch();

    const { totalComments, page, limit } = useAppSelector((state) => state.videoPlayer.comments);
    const { videoSlug: slug } = useAppSelector((state) => state.videoPlayer);

    const [commentText, setCommentText] = useState("");

    const updateCommentText = (text: string) => setCommentText(text);

    const haveMoreComments = () => {
        return page * limit < totalComments;
    };

    const handleLoadMoreComments = () => {
        if (haveMoreComments() && slug) {
            dispatch(incrementCommentsPage());
            dispatch(loadMoreVideoCommentsThunk({ slug, page: page + 1, limit }));
        }
    };

    const handlePostNewComment = (e: React.FormEvent) => {
        e.preventDefault();

        if (slug) {
            dispatch(postVideoCommentThunk({ slug, text: commentText }));
        }

        setCommentText("");
    };

    const handleCommentEdit = (e: React.FormEvent, commentId: string) => {
        e.preventDefault();

        if (slug) {
            dispatch(editVideoCommentThunk({ slug, commentId, text: commentText }));
        }

        setCommentText("");
    };

    const deleteComment = (commentId: string) => {
        if (slug) {
            dispatch(deleteVideoCommentThunk({ slug, commentId }));
        }
    };

    return {
        commentText,
        updateCommentText,
        haveMoreComments,
        handleLoadMoreComments,
        handlePostNewComment,
        handleCommentEdit,
        deleteComment,
    };
};

export default useVideoCommentsActions;
