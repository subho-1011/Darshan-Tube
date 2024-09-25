import { createSlice } from "@reduxjs/toolkit";
import { CommentsState, VideoPlayerState } from "@/types/store.typs";
import { fetchVideoData, toggleVideoLike } from "@/store/thunk-api/video-player.thunkapi";
import { toggleSubscription } from "@/store/thunk-api/subscriptions.thunkapi";
import {
    deleteVideoCommentThunk,
    editVideoCommentThunk,
    fetchVideoCommentsThunk,
    loadMoreVideoCommentsThunk,
    postVideoCommentThunk,
    toggleVideoCommentLikeThunk,
} from "../thunk-api/video-comments.thunkapi";

const initialCommentsState: CommentsState = {
    page: 1,
    limit: 1,
    totalComments: 0,
    comments: null,
    commentsError: null,
    commentsLoading: false,
};

const initialVideoPlayerState: VideoPlayerState = {
    videoSlug: null,
    video: null,
    comments: initialCommentsState,
    videoError: null,
    videoLoading: false,
    globalError: {},
    loading: {},
};

const videoPlayerSlice = createSlice({
    name: "videoPlayer",
    initialState: initialVideoPlayerState,
    reducers: {
        setVideoSlug: (state, action) => {
            state.videoSlug = action.payload;
        },

        setVideoError: (state, action) => {
            state.videoError = action.payload;
        },

        incrementCommentsPage: (state) => {
            state.comments.page = state.comments.page + 1;
        },

        // reset video player state
        resetVideoPlayer: () => {
            return { ...initialVideoPlayerState };
        },
    },

    extraReducers: (builder) => {
        // video player data fetch
        builder
            .addCase(fetchVideoData.pending, (state) => {
                state.videoLoading = true;
                state.videoError = null;
                state.comments.commentsLoading = true;
                state.comments.commentsError = null;
                state.globalError = {};
            })
            .addCase(fetchVideoData.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.video = action.payload.video;
                state.videoError = null;
            })
            .addCase(fetchVideoData.rejected, (state, action) => {
                state.videoLoading = false;
                state.videoError = action.error.message || "Failed to fetch video player data";
            });

        // video player comments fetch
        builder
            .addCase(fetchVideoCommentsThunk.pending, (state) => {
                state.comments.commentsLoading = true;
                state.comments.commentsError = null;
            })
            .addCase(fetchVideoCommentsThunk.fulfilled, (state, action) => {
                state.comments.commentsLoading = false;
                state.comments.comments = [...action.payload.comments];
                state.comments.totalComments = action.payload.totalComments;
                state.comments.commentsError = null;
            })
            .addCase(fetchVideoCommentsThunk.rejected, (state, action) => {
                state.comments.commentsLoading = false;
                state.comments.commentsError =
                    action.error.message || "Failed to fetch video comments";
            });

        // load more video player comments
        builder
            .addCase(loadMoreVideoCommentsThunk.pending, (state) => {
                state.globalError.loadMoreVideoComments = null;
                state.loading.loadMoreVideoComments = true;
            })
            .addCase(loadMoreVideoCommentsThunk.fulfilled, (state, action) => {
                const comments = state.comments.comments || [];
                state.comments.comments = [
                    ...comments,
                    ...action.payload.comments,
                ];
                state.comments.commentsError = null;
                state.comments.totalComments = action.payload.totalComments;
                state.loading.loadMoreVideoComments = false;
            })
            .addCase(loadMoreVideoCommentsThunk.rejected, (state, action) => {
                state.globalError.loadMoreVideoComments =
                    action.error.message ||
                    "Failed to load more video comments";
                state.loading.loadMoreVideoComments = false;
            });

        // video liked toggled fetch
        builder
            .addCase(toggleVideoLike.pending, (state) => {
                state.globalError.toggleVideoLike = null;

                if (state.video) {
                    const isLiked = !state.video.isLiked;
                    state.video.isLiked = isLiked;
                    state.video.likes = isLiked
                        ? state.video.likes + 1
                        : state.video.likes - 1;
                }
            })
            .addCase(toggleVideoLike.rejected, (state, action) => {
                if (state.video) {
                    const isLiked = !state.video.isLiked;
                    state.video.isLiked = isLiked;
                    state.video.likes = isLiked
                        ? state.video.likes + 1
                        : state.video.likes - 1;
                }

                state.globalError.toggleVideoLike =
                    action.error.message || "Failed to toggle video like";
            });

        // toggle video subscribed button
        builder
            .addCase(toggleSubscription.pending, (state) => {
                state.globalError.toggleSubscription = null;

                if (state.video && state.video.owner) {
                    const isSubscribed = !state.video.isSubscribed;
                    const subscribers = state.video.owner.subscribers;

                    state.video.isSubscribed = isSubscribed;
                    state.video.owner.subscribers = isSubscribed
                        ? subscribers + 1
                        : subscribers - 1;
                }
            })
            .addCase(toggleSubscription.rejected, (state, action) => {
                if (state.video && state.video.owner) {
                    const isSubscribed = !state.video.isSubscribed;
                    const subscribers = state.video.owner.subscribers;

                    state.video.isSubscribed = isSubscribed;
                    state.video.owner.subscribers = isSubscribed
                        ? subscribers + 1
                        : subscribers - 1;
                }

                state.globalError.toggleSubscription =
                    action.error.message || "Failed to toggle video subscribe";
            });

        // post video comment
        builder
            .addCase(postVideoCommentThunk.pending, (state) => {
                state.globalError["postVideoComment"] = null;
                state.loading["postVideoComment"] = true;
            })
            .addCase(postVideoCommentThunk.fulfilled, (state, action) => {
                state.globalError["postVideoComment"] = null;
                state.loading["postVideoComment"] = false;

                const newComment = action.payload.comment;
                const comments = state.comments.comments || [];
                state.comments.comments = [newComment, ...comments];

                state.comments.totalComments = state.comments.totalComments + 1;
            })
            .addCase(postVideoCommentThunk.rejected, (state, action) => {
                state.loading["postVideoComment"] = false;
                const commentErrorMessage = action.error.message || "Failed to post video comment";
                state.globalError["postVideoComment"] = commentErrorMessage;
            });

        // edit video comment
        builder
            .addCase(editVideoCommentThunk.pending, (state) => {
                state.globalError["editVideoComment"] = null;
            })
            .addCase(editVideoCommentThunk.fulfilled, (state, action) => {
                state.globalError["editVideoComment"] = null;
                if (state.comments.comments) {
                    const comment = [...state.comments.comments];

                    state.comments.comments = comment.map((c) => {
                        if (c.id === action.payload.comment.id) {
                            return {
                                ...c,
                                text: action.payload.comment.text,
                            };
                        }
                        return c;
                    });
                }
            })
            .addCase(editVideoCommentThunk.rejected, (state, action) => {
                const commentErrorMessage = action.error.message || "Failed to edit video comment";
                state.globalError["editVideoComment"] = commentErrorMessage;
            });

        // video comment liked toggled
        builder
            .addCase(toggleVideoCommentLikeThunk.pending, (state) => {
                state.globalError["toggleVideoCommentLike"] = null;
            })
            .addCase(toggleVideoCommentLikeThunk.fulfilled, (state, action) => {
                state.globalError["toggleVideoCommentLike"] = null;

                if (!state.comments.comments) return;
                const isLiked = action.payload.liked;
                const comments = [...state.comments.comments];
                state.comments.comments = comments.map((c) => {
                    if (c.id === action.meta.arg.commentId) {
                        return {
                            ...c,
                            isLiked,
                            likes: isLiked ? c.likes + 1 : c.likes - 1,
                        };
                    }
                    return c;
                });
            })
            .addCase(toggleVideoCommentLikeThunk.rejected, (state, action) => {
                const likedErrorMessage = action.error.message || "Failed to toggle comment like";
                state.globalError["toggleVideoCommentLike"] = likedErrorMessage;
            });

        // delete video comment
        builder
            .addCase(deleteVideoCommentThunk.pending, (state) => {
                state.globalError["deleteVideoComment"] = null;
            })
            .addCase(deleteVideoCommentThunk.fulfilled, (state, action) => {
                state.globalError["deleteVideoComment"] = null;
                if (state.comments.comments) {
                    state.comments.comments = state.comments.comments.filter(
                        (comment) => comment.id !== action.meta.arg.commentId
                    );
                    state.comments.totalComments = state.comments.totalComments - 1;
                }
            })
            .addCase(deleteVideoCommentThunk.rejected, (state, action) => {
                const commentErrorMessage =
                    action.error.message || "Failed to delete video comment";
                state.globalError["deleteVideoComment"] = commentErrorMessage;
            });

        // fetch video specific comments replies

        // TODO: video comment reply edit and delete
    },
});

export const { setVideoSlug, setVideoError, incrementCommentsPage, resetVideoPlayer } =
    videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
