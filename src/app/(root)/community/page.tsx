"use client";

import React from "react";
import { CommunityCard } from "@/components/community";
import useCommunityData from "@/hooks/use-community-data";

const CommunityPage = () => {
    const { communitys, isLoading } = useCommunityData();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            {communitys.map((community) => (
                <CommunityCard key={community.id} community={community} />
            ))}
        </React.Fragment>
    );
};

export default CommunityPage;
