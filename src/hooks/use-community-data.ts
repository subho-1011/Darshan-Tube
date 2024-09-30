"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommunityPosts } from "@/services/community.services";

const useCommunityData = () => {
    // use react query
    const { data, isLoading, error } = useQuery({
        queryKey: ["community"],
        queryFn: () => getCommunityPosts(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    return { communitys: data?.data || [], isLoading, error };
};

export default useCommunityData;
