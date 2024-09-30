"use client";

import Image from "next/image";
import { UserAvatar } from "../common";
import { TCommunityPost } from "@/types";
import { Button } from "../ui/button";
import {
    Bookmark,
    EditIcon,
    HeartIcon,
    ListPlusIcon,
    MoreVerticalIcon,
    ReplyIcon,
    Share2Icon,
    TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "../ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

interface CommonCardProps {
    community: TCommunityPost;
}

const CommunityCard: React.FC<CommonCardProps> = ({ community }) => {
    return (
        <div className="relative flex size-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 my-4 backdrop-blur-md shadow-2xl">
            <div className="flex flex-row justify-between tracking-tight">
                <div className="flex w-full justify-between">
                    <div className="flex items-center space-x-2">
                        <UserAvatar
                            username={community.owner.username}
                            src={community.owner.image}
                            name={community.owner.name}
                        />
                        <div>
                            <a
                                href=""
                                className="flex items-center whitespace-nowrap font-semibold"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {community.owner.name}
                            </a>
                            <div className="flex items-center space-x-1">
                                <a href="" className="text-sm text-gray-500 transition-all duration-75">
                                    @{community.owner.username}
                                </a>
                            </div>
                        </div>
                    </div>
                    <CommunityMoreButton community={community} />
                </div>
            </div>
            <div className="break-words leading-normal tracking-tight px-3">{community.text}</div>
            <div className="flex flex-1 items-center justify-center px-3">
                {community.images.map((image, i) => (
                    <Image
                        key={i}
                        className="w-full aspect-video shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
                        src={image}
                        alt=""
                        width={400}
                        height={400}
                    />
                ))}
            </div>
            <div className="flex px-3 justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="ghost2"
                        size="icon"
                        onClick={() => {}}
                        className="hover:scale-[1.02] focus-visible:scale-100"
                    >
                        <span className="sr-only">Like</span>
                        <HeartIcon className={`h-4 w-4 ${community.isLiked && "fill-red-500 text-red-500"}`} />
                    </Button>
                    <span className="flex items-center justify-center">{community.likes ?? 0}</span>
                </div>
                <Button variant="link" className="flex gap-2">
                    <ReplyIcon className="h-4 w-4" />
                    <span>Reply</span>
                </Button>
                <Button variant="ghost2" className="flex gap-2">
                    <Share2Icon className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </div>
        </div>
    );
};

const CommunityMoreButton: React.FC<{
    community: TCommunityPost;
}> = ({ community }) => {
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

    const handleDelete = () => {
        setIsOpenDeleteDialog(false);
    };

    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl p-2 space-y-1">
                    <DropdownMenuItem onClick={() => {}}>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                    </DropdownMenuItem>
                    {community.isOwner && (
                        <>
                            <DropdownMenuItem>
                                <EditIcon className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setIsOpenDeleteDialog(true)}
                                className="text-destructive hover:text-destructive/90"
                            >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete from here.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="destructive" onClick={handleDelete}>
                                Confirm
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default CommunityCard;
