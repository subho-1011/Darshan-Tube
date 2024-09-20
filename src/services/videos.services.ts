import { TVideoWithUser } from "@/types";
import { Video } from "@prisma/client";
import axios, { AxiosError } from "axios";

interface NewVideoUploadResponse {
    data: Video;
    message: string;
}

interface FetchVideosResponse {
    videos: TVideoWithUser[];
    message: string;
}

export const fetchVideos = async (page = 1, limit = 12): Promise<FetchVideosResponse> => {
    try {
        const { data } = await axios.get<FetchVideosResponse>(
            "/api/v1/videos?page=" + page + "&limit=" + limit
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Failed to fetch videos");
        }

        throw new Error("Unknown error occurred during videos fetch");
    }
};

/**
 * Uploads a new video to the server
 *
 * @param formData The form data of the upload request
 * @returns A promise that resolves with an object containing the newly created video and a message
 * @throws An error if the request fails for any reason
 */
export const uploadANewVideo = async (formData: FormData): Promise<NewVideoUploadResponse> => {
    try {
        const response = await axios.post<NewVideoUploadResponse>("/api/v1/videos", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(`AxiosError: ${error.response?.data?.error || error.message}`);
            throw new Error(`${error.response?.data?.error || error.message}`);
        } else {
            console.error(`Unknown error: ${error}`);
            throw new Error(`Unknown error occurred during video upload`);
        }
    }
};
