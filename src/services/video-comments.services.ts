import axios from "axios";
import { TVideoComment } from "@/types";
import { handleAxiosError } from "@/utils";

// fetch video comments using slug
const getVideoCommentsBySlug = async (
    slug: string,
    page = 1,
    limit = 10,
    sortBy?: string
): Promise<{ comments: TVideoComment[]; totalComments: number; message: string }> => {
    try {
        const { data } = await axios.get(`/api/v1/videos/${slug}/comments`, {
            params: { page, limit, sortBy },
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// post new comment
const postVideoComment = async (
    slug: string,
    text: string
): Promise<{ comment: TVideoComment; message: string }> => {
    try {
        const { data } = await axios.post(`/api/v1/videos/${slug}/comments`, {
            text,
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// toggle video comment like
const toggleVideoCommentLike = async (
    slug: string,
    commentId: string
): Promise<{ liked: boolean; message: string }> => {
    try {
        const { data } = await axios.post(
            `/api/v1/videos/${slug}/comments/${commentId}/toggle-like`
        );

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// edit video comment
const editVideoComment = async (
    slug: string,
    commentId: string,
    text: string
): Promise<{ comment: TVideoComment; message: string }> => {
    try {
        const { data } = await axios.patch(`/api/v1/videos/${slug}/comments/${commentId}`, {
            text,
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// video comment delete
const deleteVideoComment = async (
    slug: string,
    commentId: string
): Promise<{ message: string }> => {
    try {
        const { data } = await axios.delete(`/api/v1/videos/${slug}/comments/${commentId}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export {
    getVideoCommentsBySlug,
    postVideoComment,
    toggleVideoCommentLike,
    editVideoComment,
    deleteVideoComment,
};
