"use client";

import React from "react";

import { ErrorPage } from "@/components/common";
import { VideosContainer, LikedVideoCard } from "@/components/card";
import SkeletonContainer from "@/components/skeleton/skeleton-container";

import useLikedVideosData from "@/hooks/use-liked-videos-data";

const LikedVideosPage: React.FC = () => {
    const { isLoading, videos, error, handleLoadMoreLikedVideos, isLoadingMoreVideos, hasNoMoreVideos } =
        useLikedVideosData();

    if (isLoading) return <SkeletonContainer />;

    if (error) return <ErrorPage pageTitle="Liked Videos" message={error.message} />;

    return (
        <VideosContainer
            title="Liked Videos"
            hasNoMoreVideos={hasNoMoreVideos}
            loadMoreVideos={handleLoadMoreLikedVideos}
            isLoadingMoreVideos={isLoadingMoreVideos}
        >
            {videos.map((video) => (
                <LikedVideoCard key={video.id} video={video} />
            ))}
        </VideosContainer>
    );
};

export default LikedVideosPage;
