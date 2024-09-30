import { createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constant";

import {
    getCommunityPosts,
    postNewCommunityPost,
    editCommunityPost,
    deleteCommunityPost,
    toggleCommunityPostLike,
    getACommunityPostComments,
    postCommentOnCommunityPost,
    editCommunityPostComment,
    deleteCommunityPostComment,
    toggleCommunityPostCommentLike,
} from "@/services/community.services";

// fetch initial community posts
const fetchInitialCommunityPosts = createAsyncThunk(
    "community/fetchInitialCommunityPosts",
    async ({
        page = parseInt(DEFAULT_PAGE),
        limit = parseInt(DEFAULT_LIMIT),
    }: {
        page?: number;
        limit?: number;
    }) => {
        return getCommunityPosts(page, limit);
    }
);

// load more community posts
const loadMoreCommunityPosts = createAsyncThunk(
    "community/loadMoreCommunityPosts",
    async ({
        page = parseInt(DEFAULT_PAGE),
        limit = parseInt(DEFAULT_LIMIT),
    }: {
        page?: number;
        limit?: number;
    }) => {
        return getCommunityPosts(page, limit);
    }
);

// post new community post
const postNewCommunityPostThunk = createAsyncThunk(
    "community/postNewCommunityPost",
    async (formData: FormData) => {
        return postNewCommunityPost(formData);
    }
);

// edit community post
const editCommunityPostThunk = createAsyncThunk(
    "community/editCommunityPost",
    async ({ postId, text }: { postId: string; text: string }) => {
        return editCommunityPost(postId, text);
    }
);

// delete community post
const deleteCommunityPostThunk = createAsyncThunk(
    "community/deleteCommunityPost",
    async ({ postId }: { postId: string }) => {
        return deleteCommunityPost(postId);
    }
);

// toggle community post like
const toggleCommunityPostLikeThunk = createAsyncThunk(
    "community/toggleCommunityPostLike",
    async ({ postId }: { postId: string }) => {
        return toggleCommunityPostLike(postId);
    }
);

// get a community post comments
const getACommunityPostCommentsThunk = createAsyncThunk(
    "community/getACommunityPostComments",
    async ({ postId }: { postId: string }) => {
        return getACommunityPostComments(postId);
    }
);

// post comment on community post
const postCommentOnCommunityPostThunk = createAsyncThunk(
    "community/postCommentOnCommunityPost",
    async ({ postId, text }: { postId: string; text: string }) => {
        return postCommentOnCommunityPost(postId, text);
    }
);

// edit community post comment
const editCommunityPostCommentThunk = createAsyncThunk(
    "community/editCommunityPostComment",
    async ({ postId, commentId, text }: { postId: string; commentId: string; text: string }) => {
        return editCommunityPostComment(postId, commentId, text);
    }
);

// delete community post comment
const deleteCommunityPostCommentThunk = createAsyncThunk(
    "community/deleteCommunityPostComment",
    async ({ postId, commentId }: { postId: string; commentId: string }) => {
        return deleteCommunityPostComment(postId, commentId);
    }
);

// toggle community post comment like
const toggleCommunityPostCommentLikeThunk = createAsyncThunk(
    "community/toggleCommunityPostCommentLike",
    async ({ postId, commentId }: { postId: string; commentId: string }) => {
        return toggleCommunityPostCommentLike(postId, commentId);
    }
);

export {
    fetchInitialCommunityPosts,
    loadMoreCommunityPosts,
    postNewCommunityPostThunk,
    editCommunityPostThunk,
    deleteCommunityPostThunk,
    toggleCommunityPostLikeThunk,
    getACommunityPostCommentsThunk,
    postCommentOnCommunityPostThunk,
    editCommunityPostCommentThunk,
    deleteCommunityPostCommentThunk,
    toggleCommunityPostCommentLikeThunk,
};
