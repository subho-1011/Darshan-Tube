"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils";

import { DotIcon } from "lucide-react";
import { UserAvatar } from "@/components/common";
import { VideoThumbnail } from "@/components/videos";

import { TBasicDataOfVideoWithUser } from "@/types";

interface VideoCardWrapperProps {
    className?: string;
    children?: React.ReactNode;
    video: TBasicDataOfVideoWithUser;
}

const VideoCardWrapper: React.FC<VideoCardWrapperProps> = ({ className, children, video }) => {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2, ease: "easeInOut" }}
            className={cn("overflow-hidden w-full rounded-2xl p-2 shadow-lg hover:shadow-xl", className)}
        >
            <div className="flex flex-col">
                <VideoThumbnail title={video.title} thumbnailUrl={video.thumbnailUrl} slug={video.slug} />
                <div className="flex space-x-4 py-1.5">
                    <UserAvatar name={video.owner.name} username={video.owner.username} src={video.owner.image} />

                    <div className="grow">
                        <Link href={`/videos/${video.slug}`}>
                            <h3 className="font-semibold text-sm line-clamp-2">{video?.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground inline-flex">
                            <Link href={`/@${video.owner.username}`}>{video?.owner?.username}</Link>
                            <DotIcon />
                            {video?.views} views
                        </p>
                        <p className="text-[0.75rem] text-muted-foreground">{timeAgo(video?.createdAt)}</p>
                    </div>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default VideoCardWrapper;
