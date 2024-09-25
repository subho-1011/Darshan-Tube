import axios from "axios";
import { handleAxiosError } from "@/utils";

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

export { toggleVideoLikeBySlug };
