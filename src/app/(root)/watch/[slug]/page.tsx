"use client";

import {
    VideoPlayer,
    ChannelInfo,
    VideoDescription as Description,
    VideoCommentsSection as Comments,
    VideoLikedButton,
    VideoShareButton,
    VideoDownloadButton,
    VideoMoreButton,
} from "@/components/watch";

import { useVideoPlayerState } from "@/hooks/watch";

export default function Component() {
    const { video } = useVideoPlayerState();

    if (!video) {
        return <div>Video not found</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
            <div className="flex-1">
                <VideoPlayer />
                <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
                <div className="flex items-center justify-between mb-4">
                    <ChannelInfo
                        isSubscribed={video?.isSubscribed}
                        owner={video?.owner}
                    />
                    <section id="video-actions" className="flex gap-2">
                        <VideoLikedButton
                            slug={video?.slug}
                            isLiked={video.isLiked}
                            likes={video.likes}
                        />
                        <VideoShareButton />
                        <VideoDownloadButton videoUrl={video.videoUrl} />
                        <VideoMoreButton />
                    </section>
                </div>
                <Description video={video} />
                <Comments />
            </div>
            <aside id="sidebar" className="w-full lg:w-80">
                <h3 className="font-semibold mb-4">Recommended videos</h3>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2 mb-4">
                        <div className="w-40 h-24 bg-gray-200 rounded-lg"></div>
                        <div>
                            <h4 className="font-semibold">
                                Another Great Video Title
                            </h4>
                            <p className="text-sm text-gray-500">
                                Channel Name
                            </p>
                            <p className="text-sm text-gray-500">
                                123K views • 2 days ago
                            </p>
                        </div>
                    </div>
                ))}
            </aside>
        </div>
    );
}
