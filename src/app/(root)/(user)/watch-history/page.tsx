"use client";

import WatchHistory from "./watch-history";
import ErrorPage from "@/components/common/error-page";
import useWatchHistoryData from "@/hooks/use-watch-history-data";
import WelcomePageSkeleton from "@/components/skeleton/skeleton-container";

const WatchHistoryPage = () => {
    const { videos, isInitializeWatchHistory, error } = useWatchHistoryData();

    if (isInitializeWatchHistory) return <WelcomePageSkeleton />;

    if (error) return <ErrorPage message={error} />;

    return <WatchHistory videos={videos} />;
};

export default WatchHistoryPage;
