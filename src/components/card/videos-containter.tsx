"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideosContainerProps {
    children: React.ReactNode;
    className?: string;
    title: string;
    isLoadingMoreVideos?: boolean;
    hasNoMoreVideos?: boolean;
    loadMoreVideos?: () => void;
}

const VideosContainer: React.FC<VideosContainerProps> = ({
    children,
    className,
    title,
    isLoadingMoreVideos,
    hasNoMoreVideos,
    loadMoreVideos,
}) => {
    return (
        <div className={cn("container mx-auto w-full px-4 py-8", className)}>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <React.Fragment>{children}</React.Fragment>
            </div>
            <div className="flex justify-around my-6">
                {isLoadingMoreVideos ? (
                    <LoaderIcon className="h-8 w-8 animate-spin" />
                ) : hasNoMoreVideos ? (
                    <p>No more videos in {title.toLowerCase()} page</p>
                ) : (
                    <Button variant="link" onClick={loadMoreVideos}>
                        load more videos...
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VideosContainer;
