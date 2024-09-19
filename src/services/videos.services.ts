import { Video } from "@prisma/client";
import axios, { AxiosError } from "axios";

interface NewVideoUploadResponse {
    data: Video;
    message: string;
}

// Function to upload a new video
export const uploadANewVideo = async (
    formData: FormData
): Promise<NewVideoUploadResponse> => {
    try {
        const response = await axios.post<NewVideoUploadResponse>(
            "/api/v1/videos",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(
                `AxiosError: ${error.response?.data?.error || error.message}`
            );
            throw new Error(`${error.response?.data?.error || error.message}`);
        } else {
            console.error(`Unknown error: ${error}`);
            throw new Error(`Unknown error occurred during video upload`);
        }
    }
};
