import axios from "axios";
import { handleAxiosError } from "@/utils";
import { TVideoWithUser } from "@/types";

// fetch video data using slug
const getVideoDataBySlug = async (
    slug: string
): Promise<{ video: TVideoWithUser; message: string }> => {
    try {
        const { data } = await axios.get(`/api/v1/videos/${slug}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export { getVideoDataBySlug };
