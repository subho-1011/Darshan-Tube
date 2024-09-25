import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleSubscriptionByUser } from "@/services/subscriptions.services";

const toggleSubscription = createAsyncThunk(
    "subscriptions/toggleSubscription",
    async ({ channelId }: { channelId: string }) => {
        return toggleSubscriptionByUser(channelId);
    }
);

export { toggleSubscription };
