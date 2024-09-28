"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TBasicDataOfVideoWithUser } from "@/types";
import { getLikedVideos } from "@/services/likes.services";

const useLikedVideosData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState<TBasicDataOfVideoWithUser[]>([]);
    const [isLoadingMoreVideos, setIsLoadingMoreVideos] = useState(false);
    const [hasNoMoreVideos, setHasNoMoreVideos] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["liked-videos"],
        queryFn: () => getLikedVideos(currentPage),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const handleLoadMoreLikedVideos = async () => {
        if (isLoadingMoreVideos) return;

        setIsLoadingMoreVideos(true);

        const { data } = await getLikedVideos(currentPage + 1);
        if (data.length === 0) {
            setHasNoMoreVideos(true);
            setIsLoadingMoreVideos(false);
            return;
        }

        setCurrentPage((prevPage) => prevPage + 1);
        setVideos((prevVideos) => [...prevVideos, ...data]);

        setIsLoadingMoreVideos(false);
    };

    useEffect(() => {
        setVideos(data?.data || []);

        return () => {
            setVideos([]);
        };
    }, [data?.data]);

    return { videos, isLoading, error, handleLoadMoreLikedVideos, isLoadingMoreVideos, hasNoMoreVideos };
};

export default useLikedVideosData;
