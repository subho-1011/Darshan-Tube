"use client";

import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useWatchHistoryData from "@/hooks/use-watch-history-data";

const MoreVideosButton: React.FC = () => {
    const { isInitializeWatchHistory, isLoadMoreWatchHistory, loadMoreVideos, hasNoMoreVideos } =
        useWatchHistoryData();

    if (isInitializeWatchHistory || isLoadMoreWatchHistory) {
        return (
            <div className="flex justify-around my-6">
                <LoaderIcon className="h-8 w-8 animate-spin" />;
            </div>
        );
    }

    return (
        <div className="flex justify-around my-6">
            {!hasNoMoreVideos ? (
                <Button variant="link" onClick={loadMoreVideos}>
                    load more videos...
                </Button>
            ) : (
                <p>No more videos to load</p>
            )}
        </div>
    );
};

export default MoreVideosButton;
