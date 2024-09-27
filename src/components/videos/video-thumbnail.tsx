"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoThumbnailProps {
    className?: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
    title,
    slug,
    thumbnailUrl,
    className,
}) => {
    return (
        <Link href={`/watch/${slug}`}>
            <Image
                className={cn("aspect-video w-full object-cover rounded-2xl", className)}
                src={thumbnailUrl}
                alt={title}
                width={360}
                height={200}
                priority
            />
        </Link>
    );
};

export default VideoThumbnail;
