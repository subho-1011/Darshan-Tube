// toggle subscription
import axios from "axios";
import { handleAxiosError } from "@/utils";

const toggleSubscriptionByUser = async (
    channelId: string
): Promise<{
    message: string;
}> => {
    try {
        const { data } = await axios.post(`/api/v1/subscriptions/${channelId}`);

        return data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export { toggleSubscriptionByUser };
