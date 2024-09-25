"use client";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { toggleSubscription } from "@/store/thunk-api/subscriptions.thunkapi";

const useWatchButtonsActions = () => {
    const dispatch = useAppDispatch();

    const channelId = useAppSelector(
        (state) => state.videoPlayer.video?.ownerId
    );

    const handleSubscrition = () => {
        if (!channelId) return;
        dispatch(toggleSubscription({ channelId }));
    };

    return {
        handleSubscrition,
    };
};

export default useWatchButtonsActions;
