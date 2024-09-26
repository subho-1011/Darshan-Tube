import axios from "axios";
import { TVideo } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SortType } from "@/hooks/use-select-sorting";

export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async ({
        pageNumber = 1,
        limit = 12,
        sortBy,
    }: {
        pageNumber?: number;
        limit?: number;
        sortBy?: SortType;
    }): Promise<{ videos: TVideo[]; message: string }> => {
        try {
            const { data } = await axios.get(
                `/api/v1/videos?page=${pageNumber}&limit=${limit}&sortBy=${sortBy}`
            );

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || error.message);
            }

            throw new Error("Unknown error occurred during videos fetch");
        }
    }
);

export const fetchTotalVideos = createAsyncThunk(
    "videos/fetchTotalVideos",
    async (): Promise<{ totalVideos: number; message: string }> => {
        try {
            const { data } = await axios.get(`/api/v1/videos/total-videos`);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || error.message);
            }

            throw new Error("Unknown error occurred during videos fetch");
        }
    }
);
