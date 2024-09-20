import React from "react";
import { cn } from "@/lib/utils";
import { TVideoWithUser } from "@/types";
import { VideoThumbnailCard } from "./video-thumbnail-card";

type VideoContainerProps = {
    name: string;
    videos: TVideoWithUser[];
    className?: string;
};

const VideoContainer: React.FC<VideoContainerProps> = ({ name, videos, className }) => {
    if (videos.length === 0) {
        return (
            <div id={name} className={cn("container mx-auto px-4", className)}>
                <h1 className="text-2xl font-bold mb-6">No videos found for {name}</h1>
            </div>
        );
    }

    return (
        <section id={name} className={cn("container mx-auto px-4", className)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <VideoThumbnailCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
};

export default VideoContainer;
