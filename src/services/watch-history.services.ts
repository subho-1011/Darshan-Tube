import axios from "axios";
import { handleAxiosError } from "@/utils";
import { DEVICE } from "@prisma/client";

// Add to watch history for fist time
const addToWatchHistory = async (videoId: string, device: DEVICE = "DESKTOP") => {
    try {
        const { data } = await axios.post(`/api/v1/watch-history/${videoId}`, {
            device,
        });

        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// add to watch time for every time interval
const addToWatchTime = async (
    videoId: string,
    duration: number,
    timeStamp: number,
    device: DEVICE = "DESKTOP",
    completed = false
) => {
    try {
        const { data } = await axios.patch(`/api/v1/watch-history/${videoId}`, {
            duration,
            timeStamp,
            device,
            completed,
        });

        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// fetch watch history
const fetchWatchHistory = async () => {
    try {
        const { data } = await axios.get(`/api/v1/watch-history`);

        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// delete watch history
const deleteWatchHistory = async (videoId: string) => {
    try {
        const { data } = await axios.delete(`/api/v1/watch-history/${videoId}`);
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export { addToWatchHistory, addToWatchTime, fetchWatchHistory, deleteWatchHistory };
