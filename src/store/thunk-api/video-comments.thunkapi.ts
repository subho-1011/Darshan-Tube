import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteVideoComment,
    editVideoComment,
    getVideoCommentsBySlug,
    postVideoComment,
    toggleVideoCommentLike,
} from "@/services/video-comments.services";

const fetchVideoCommentsThunk = createAsyncThunk(
    "videoComments/fetchVideoComments",
    async ({
        slug,
        page,
        limit,
        sortBy,
    }: {
        slug: string;
        page?: number;
        limit?: number;
        sortBy?: string;
    }) => {
        return await getVideoCommentsBySlug(slug, page, limit, sortBy);
    }
);

const loadMoreVideoCommentsThunk = createAsyncThunk(
    "videoComments/loadMoreVideoComments",
    async ({
        slug,
        page,
        limit,
        sortBy,
    }: {
        slug: string;
        page: number;
        limit: number;
        sortBy?: string;
    }) => {
        return await getVideoCommentsBySlug(slug, page, limit, sortBy);
    }
);

const postVideoCommentThunk = createAsyncThunk(
    "videoComments/postVideoComment",
    async ({ slug, text }: { slug: string; text: string }) => {
        return await postVideoComment(slug, text);
    }
);

const toggleVideoCommentLikeThunk = createAsyncThunk(
    "videoComments/toggleVideoCommentLike",
    async ({ slug, commentId }: { slug: string; commentId: string }) => {
        return await toggleVideoCommentLike(slug, commentId);
    }
);

const editVideoCommentThunk = createAsyncThunk(
    "videoComments/editVideoComment",
    async ({ slug, commentId, text }: { slug: string; commentId: string; text: string }) => {
        return await editVideoComment(slug, commentId, text);
    }
);

const deleteVideoCommentThunk = createAsyncThunk(
    "videoComments/deleteVideoComment",
    async ({ slug, commentId }: { slug: string; commentId: string }) => {
        return await deleteVideoComment(slug, commentId);
    }
);

export {
    fetchVideoCommentsThunk,
    loadMoreVideoCommentsThunk,
    postVideoCommentThunk,
    toggleVideoCommentLikeThunk,
    editVideoCommentThunk,
    deleteVideoCommentThunk,
};
