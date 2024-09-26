"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useVideoPlayer, useVideoPlayerState } from "@/hooks/watch";

export const VideoPlayer: React.FC = () => {
    const {
        video,
        videoRef,
        handleVideoEnded,
        handleVideoPause,
        handleVideoPlay,
    } = useVideoPlayer();

    const { isVideoLoading } = useVideoPlayerState();

    if (isVideoLoading) {
        return <Skeleton className=" aspect-video" />;
    }

    return (
        <section className="aspect-video bg-primary rounded-xl mb-4">
            <video
                ref={videoRef}
                src={video?.videoUrl}
                title={video?.title}
                className="w-full h-full rounded-xl"
                poster={video?.thumbnailUrl}
                controls
                onEnded={handleVideoEnded}
                onPause={handleVideoPause}
                onPlay={handleVideoPlay}
            >
                <a href=""></a>
                your video is now available
            </video>
        </section>
    );
};
