import { TCommunityPost, TCommunityPostComment } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
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
} from "../thunk-api/community.thunkapi";
import { DEFAULT_LIMIT } from "@/constant";

type CommunityActions =
    | "fetchInitialPosts"
    | "loadMorePosts"
    | "fetchAPost"
    | "createANewPost"
    | "editAExistingPost"
    | "deleteAExistingPost"
    | "toggleLikeOnAPost"
    | "fetchAPostComment"
    | "loadMoreAPostComment"
    | "createAPostComment"
    | "editAPostComment"
    | "toggleLikeOnAPostComment"
    | "deleteAPostComment";

interface CommunityState {
    currentPage: number;
    limit: number | string;
    posts: TCommunityPost[];
    hasNoMorePosts: boolean;
    commentsOnAPost: {
        [communityPostId: string]: TCommunityPostComment[] | null;
    };
    error: Record<CommunityActions, string | null>;
    loading: Record<CommunityActions, boolean>;
}

const initialState: CommunityState = {
    posts: [],
    currentPage: 1,
    limit: 10,
    commentsOnAPost: {},
    hasNoMorePosts: false,
    error: {
        fetchInitialPosts: null,
        loadMorePosts: null,
        fetchAPost: null,
        createANewPost: null,
        editAExistingPost: null,
        deleteAExistingPost: null,
        toggleLikeOnAPost: null,
        fetchAPostComment: null,
        loadMoreAPostComment: null,
        createAPostComment: null,
        editAPostComment: null,
        toggleLikeOnAPostComment: null,
        deleteAPostComment: null,
    },
    loading: {
        fetchInitialPosts: false,
        loadMorePosts: false,
        fetchAPost: false,
        createANewPost: false,
        editAExistingPost: false,
        deleteAExistingPost: false,
        toggleLikeOnAPost: false,
        fetchAPostComment: false,
        loadMoreAPostComment: false,
        createAPostComment: false,
        editAPostComment: false,
        toggleLikeOnAPostComment: false,
        deleteAPostComment: false,
    },
};

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        resetCommunityStore: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialCommunityPosts.pending, (state) => {
                state.loading.fetchInitialPosts = true;
                state.error.fetchInitialPosts = null;
            })
            .addCase(fetchInitialCommunityPosts.fulfilled, (state, action) => {
                state.loading.fetchInitialPosts = false;
                state.posts = action.payload.data;
                state.error.fetchInitialPosts = null;
            })
            .addCase(fetchInitialCommunityPosts.rejected, (state, action) => {
                state.loading.fetchInitialPosts = false;
                state.error.fetchInitialPosts = action.error.message || "Failed to fetch posts";
            });

        builder
            .addCase(loadMoreCommunityPosts.pending, (state) => {
                state.loading.loadMorePosts = true;
                state.error.loadMorePosts = null;
            })
            .addCase(loadMoreCommunityPosts.fulfilled, (state, action) => {
                state.loading.loadMorePosts = false;
                state.posts = [...state.posts, ...action.payload.data];
                state.currentPage += 1;
                state.hasNoMorePosts = action.payload.data.length < parseInt(DEFAULT_LIMIT);
                state.error.loadMorePosts = null;
            })
            .addCase(loadMoreCommunityPosts.rejected, (state, action) => {
                state.loading.loadMorePosts = false;
                state.error.loadMorePosts = action.error.message || "Failed to load more posts";
            });

        builder
            .addCase(postNewCommunityPostThunk.pending, (state) => {
                state.loading.createANewPost = true;
                state.error.createANewPost = null;
            })
            .addCase(postNewCommunityPostThunk.fulfilled, (state, action) => {
                state.loading.createANewPost = false;
                state.posts = [action.payload.data, ...state.posts];
                state.error.createANewPost = null;
            })
            .addCase(postNewCommunityPostThunk.rejected, (state, action) => {
                state.loading.createANewPost = false;
                state.error.createANewPost = action.error.message || "Failed to create a new post";
            });

        builder
            .addCase(editCommunityPostThunk.pending, (state) => {
                state.loading.editAExistingPost = true;
                state.error.editAExistingPost = null;
            })
            .addCase(editCommunityPostThunk.fulfilled, (state, action) => {
                state.loading.editAExistingPost = false;
                const editedPost = action.payload.data;
                if (state.posts) {
                    state.posts = state.posts.map((post) =>
                        post.id === editedPost.id ? editedPost : post
                    );
                }
                state.error.editAExistingPost = null;
            })
            .addCase(editCommunityPostThunk.rejected, (state, action) => {
                state.loading.editAExistingPost = false;
                state.error.editAExistingPost = action.error.message || "Failed to edit a post";
            });

        builder
            .addCase(deleteCommunityPostThunk.pending, (state) => {
                state.loading.deleteAExistingPost = true;
                state.error.deleteAExistingPost = null;
            })
            .addCase(deleteCommunityPostThunk.fulfilled, (state, action) => {
                state.loading.deleteAExistingPost = false;
                state.posts = state.posts?.filter((post) => post.id !== action.meta.arg.postId);
                state.error.deleteAExistingPost = null;
            })
            .addCase(deleteCommunityPostThunk.rejected, (state, action) => {
                state.loading.deleteAExistingPost = false;
                state.error.deleteAExistingPost = action.error.message || "Failed to delete a post";
            });

        builder
            .addCase(toggleCommunityPostLikeThunk.pending, (state) => {
                state.loading.toggleLikeOnAPost = true;
                state.error.toggleLikeOnAPost = null;
            })
            .addCase(toggleCommunityPostLikeThunk.fulfilled, (state, action) => {
                state.loading.toggleLikeOnAPost = false;
                state.posts.map((post) => {
                    if (post.id === action.meta.arg.postId) {
                        post.isLiked = post.isLiked ? false : true;
                        post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
                    }
                });
                state.error.toggleLikeOnAPost = null;
            })
            .addCase(toggleCommunityPostLikeThunk.rejected, (state, action) => {
                state.loading.toggleLikeOnAPost = false;
                state.error.toggleLikeOnAPost =
                    action.error.message || "Failed to toggle like on a post";
            });

        builder
            .addCase(getACommunityPostCommentsThunk.pending, (state) => {
                state.loading.fetchAPostComment = true;
                state.error.fetchAPostComment = null;
            })
            .addCase(getACommunityPostCommentsThunk.fulfilled, (state, action) => {
                state.loading.fetchAPostComment = false;
                const postId = action.meta.arg.postId;
                state.commentsOnAPost[postId] = action.payload.data;
                state.error.fetchAPostComment = null;
            })
            .addCase(getACommunityPostCommentsThunk.rejected, (state, action) => {
                state.loading.fetchAPostComment = false;
                state.error.fetchAPostComment =
                    action.error.message || "Failed to fetch a post comment";
            });

        builder
            .addCase(postCommentOnCommunityPostThunk.pending, (state) => {
                state.loading.createAPostComment = true;
                state.error.createAPostComment = null;
            })
            .addCase(postCommentOnCommunityPostThunk.fulfilled, (state, action) => {
                state.loading.createAPostComment = false;
                const postId = action.meta.arg.postId;
                state.commentsOnAPost[postId] = [
                    action.payload.data,
                    ...(state.commentsOnAPost[postId] || []),
                ];
                state.error.createAPostComment = null;
            })
            .addCase(postCommentOnCommunityPostThunk.rejected, (state, action) => {
                state.loading.createAPostComment = false;
                state.error.createAPostComment =
                    action.error.message || "Failed to post a post comment";
            });

        builder
            .addCase(editCommunityPostCommentThunk.pending, (state) => {
                state.loading.editAPostComment = true;
                state.error.editAPostComment = null;
            })
            .addCase(editCommunityPostCommentThunk.fulfilled, (state, action) => {
                state.loading.editAPostComment = false;
                const postId = action.meta.arg.postId;
                if (state.commentsOnAPost[postId]) {
                    state.commentsOnAPost[postId] = state.commentsOnAPost[postId].map((comment) =>
                        comment.id === action.payload.data.id ? action.payload.data : comment
                    );
                }
                state.error.editAPostComment = null;
            })
            .addCase(editCommunityPostCommentThunk.rejected, (state, action) => {
                state.loading.editAPostComment = false;
                state.error.editAPostComment =
                    action.error.message || "Failed to edit a post comment";
            });

        builder
            .addCase(toggleCommunityPostCommentLikeThunk.pending, (state) => {
                state.loading.toggleLikeOnAPostComment = true;
                state.error.toggleLikeOnAPostComment = null;
            })
            .addCase(toggleCommunityPostCommentLikeThunk.fulfilled, (state, action) => {
                state.loading.toggleLikeOnAPostComment = false;
                const postId = action.meta.arg.postId;
                if (state.commentsOnAPost[postId]) {
                    state.commentsOnAPost[postId] = state.commentsOnAPost[postId].map((comment) => {
                        if (comment.id === action.meta.arg.commentId) {
                            comment.isLiked = comment.isLiked ? false : true;
                            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                        }
                        return comment;
                    });
                }
                state.error.toggleLikeOnAPostComment = null;
            })
            .addCase(toggleCommunityPostCommentLikeThunk.rejected, (state, action) => {
                state.loading.toggleLikeOnAPostComment = false;
                state.error.toggleLikeOnAPostComment =
                    action.error.message || "Failed to toggle like on a post comment";
            });

        builder
            .addCase(deleteCommunityPostCommentThunk.pending, (state) => {
                state.loading.deleteAPostComment = true;
                state.error.deleteAPostComment = null;
            })
            .addCase(deleteCommunityPostCommentThunk.fulfilled, (state, action) => {
                state.loading.deleteAPostComment = false;
                const postId = action.meta.arg.postId;
                if (state.commentsOnAPost[postId]) {
                    state.commentsOnAPost[postId] = state.commentsOnAPost[postId].filter(
                        (comment) => comment.id !== action.meta.arg.commentId
                    );
                }
                state.error.deleteAPostComment = null;
            })
            .addCase(deleteCommunityPostCommentThunk.rejected, (state, action) => {
                state.loading.deleteAPostComment = false;
                state.error.deleteAPostComment =
                    action.error.message || "Failed to delete a post comment";
            });
    },
});

export const { resetCommunityStore } = communitySlice.actions;

export default communitySlice.reducer;
