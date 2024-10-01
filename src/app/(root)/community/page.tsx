"use client";

import React from "react";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCommunityData from "@/hooks/use-community-data";
import { CommunityCard, CommunityPostForm } from "@/components/community";

const CommunityPage = () => {
    const { posts, loadMorePosts, hasNoMorePosts, initialLoading, loadMoreLoading } = useCommunityData();

    return (
        <React.Fragment>
            <CommunityPostForm />
            {initialLoading ? (
                <LoaderIcon className="h-8 w-8 animate-spin" />
            ) : (
                <React.Fragment>
                    {posts.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                    {loadMoreLoading ? (
                        <LoaderIcon className="h-8 w-8 animate-spin" />
                    ) : !hasNoMorePosts ? (
                        <Button variant="link" className="mt-8" onClick={loadMorePosts}>
                            Load more...
                        </Button>
                    ) : (
                        <p>No more posts</p>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default CommunityPage;
