import React from "react";
import { VideoCardSkeleton } from "./video-card-skeleton";

export default function SkeletonContainer() {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <VideoCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
