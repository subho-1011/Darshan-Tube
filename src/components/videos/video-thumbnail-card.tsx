"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { TVideo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/common";

type VideoThumbnailCardProps = {
    video: TVideo;
};

export const VideoThumbnailCard: React.FC<VideoThumbnailCardProps> = ({ video }) => {
    return (
        <Card key={video.id} className="overflow-hidden border-0">
            <CardContent className="p-0">
                <Link href={`/watch/${video.slug}`}>
                    <Image
                        className="aspect-video w-full object-cover rounded-2xl"
                        src={video.thumbnailUrl}
                        alt={video.title}
                        width={360}
                        height={200}
                        priority
                    />
                </Link>
                <div className="p-4">
                    <div className="flex items-start space-x-4">
                        <UserAvatar
                            src={video.owner.image}
                            name={video.owner.name}
                            username={video.owner.username}
                            size={40}
                        />
                        <div className="space-y-1">
                            <h3 className="font-semibold line-clamp-2">
                                {video.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {video.owner.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {video.views} views
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
