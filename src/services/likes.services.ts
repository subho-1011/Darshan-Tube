import axios from "axios";
import { handleAxiosError } from "@/utils";
import { TBasicDataOfVideoWithUser } from "@/types";

// toggle video like
const toggleVideoLikeBySlug = async (
    slug: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.post(`/api/v1/videos/${slug}/toggle-like`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

// get liked videos
const getLikedVideos = async (
    page = 1
): Promise<{
    data: TBasicDataOfVideoWithUser[];
    message: string;
}> => {
    try {
        const { data } = await axios.get(`/api/v1/liked-videos?page=${page}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export { toggleVideoLikeBySlug, getLikedVideos };
