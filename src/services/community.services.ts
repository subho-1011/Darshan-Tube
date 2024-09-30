import axios from "axios";
import { TCommunityPost, TCommunityPostComment } from "@/types";
import { handleAxiosError } from "@/utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constant";

// get community posts
const getCommunityPosts = async (
    page: number | string = DEFAULT_PAGE,
    limit: number | string = DEFAULT_LIMIT
): Promise<{
    data: TCommunityPost[];
    message: string;
}> => {
    try {
        const { data } = await axios.get(`/api/v1/community?page=${page}&limit=${limit}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// post community post
const postNewCommunityPost = async (
    formData: FormData
): Promise<{
    data: TCommunityPost;
    message: string;
}> => {
    try {
        const { data } = await axios.post("/api/v1/community", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(data);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// edit community post
const editCommunityPost = async (
    postId: string,
    text: string
): Promise<{
    data: TCommunityPost;
    message: string;
}> => {
    try {
        const { data } = await axios.patch(`/api/v1/community/${postId}`, {
            text,
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// delete community post
const deleteCommunityPost = async (
    postId: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.delete(`/api/v1/community/${postId}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// toggle community post like
const toggleCommunityPostLike = async (
    postId: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.post(`/api/v1/community/${postId}/toggle-like`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// get a community post comments
const getACommunityPostComments = async (
    postId: string
): Promise<{
    data: TCommunityPostComment[];
    message: string;
}> => {
    try {
        const { data } = await axios.get(`/api/v1/community/${postId}/comments`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// comment on community post
const postCommentOnCommunityPost = async (
    postId: string,
    text: string
): Promise<{
    data: TCommunityPostComment;
    message: string;
}> => {
    try {
        const { data } = await axios.post(`/api/v1/community/${postId}/comments`, {
            text,
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// edit community post comment
const editCommunityPostComment = async (
    postId: string,
    commentId: string,
    text: string
): Promise<{
    data: TCommunityPostComment;
    message: string;
}> => {
    try {
        const { data } = await axios.patch(`/api/v1/community/${postId}/comments/${commentId}`, {
            text,
        });

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// delete community post comment
const deleteCommunityPostComment = async (
    postId: string,
    commentId: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.delete(`/api/v1/community/${postId}/comments/${commentId}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// toggle community post comment like
const toggleCommunityPostCommentLike = async (
    postId: string,
    commentId: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.post(`/api/v1/community/${postId}/comments/${commentId}/toggle-like`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export {
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
};
