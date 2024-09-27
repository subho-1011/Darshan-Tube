"use client";

import React, { useState } from "react";
import { timeAgo } from "@/utils";
import { TWatchHistoryVideoCard } from "@/types";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VideoThumbnail } from "@/components/videos";
import { Dot, MoreVerticalIcon } from "lucide-react";
import useWatchHistoryData from "@/hooks/use-watch-history-data";
import { motion } from "framer-motion";

interface WatchHistoryVideoCardProps {
    video: TWatchHistoryVideoCard;
}

const WatchHistoryVideoCard: React.FC<WatchHistoryVideoCardProps> = ({ video }) => {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.13, duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden w-full rounded-2xl p-2 shadow-lg hover:shadow-xl"
        >
            <div className="flex flex-col">
                <VideoThumbnail
                    title={video.title}
                    thumbnailUrl={video.thumbnailUrl}
                    slug={video.slug}
                />
                <div className="flex justify-between space-x-4">
                    <VideoInfo video={video} />
                    <MoreButton videoId={video.id} />
                </div>
            </div>
        </motion.div>
    );
};

const VideoInfo: React.FC<{ video: TWatchHistoryVideoCard }> = ({ video }) => {
    return (
        <div className="m-1">
            <h3 className="font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground flex">
                {video.views} views
                <Dot />
                watched {timeAgo(video.watchedAt)}
            </p>
        </div>
    );
};

const MoreButton: React.FC<{ videoId: string }> = ({ videoId }) => {
    const [open, setOpen] = useState(false);
    const { handleWatchHistoryDelete, isDeletingWatchHistory } = useWatchHistoryData();

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} defaultOpen={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost2" size="icon">
                    <MoreVerticalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete from history</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Watch History</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete from watch history?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            handleWatchHistoryDelete(videoId);
                                            setOpen(false);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WatchHistoryVideoCard;
