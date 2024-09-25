import axios from "axios";

export const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error || error.message;
    }
    return "Unknown error occurred";
};
