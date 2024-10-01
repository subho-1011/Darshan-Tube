"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { TCommunityPost } from "@/types";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar2 } from "@/components/common";
import { Textarea } from "@/components/ui/textarea";

import {
    Bookmark,
    EditIcon,
    HeartIcon,
    LoaderIcon,
    MoreVerticalIcon,
    ReplyIcon,
    SendHorizonalIcon,
    Share2Icon,
    TrashIcon,
} from "lucide-react";

import { cn, useAppDispatch, useAppSelector } from "@/lib/utils";
import {
    deleteCommunityPostThunk,
    editCommunityPostThunk,
    toggleCommunityPostLikeThunk,
} from "@/store/thunk-api/community.thunkapi";

interface CommonCardProps {
    community: TCommunityPost;
    mode?: "modal" | "redirect";
}

const CommunityCard: React.FC<CommonCardProps> = ({ community, mode = "redirect" }) => {
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    const isEditing = useAppSelector((state) => state.community.loading.editAExistingPost);

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState(community.text);

    const onSubmitEditForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (text) {
            dispatch(editCommunityPostThunk({ text, postId: community.id }));
        }

        setIsEditable(false);
    };

    const handleCommunityClick = () => {
        if (isEditable || isEditing) return;

        if (mode === "redirect") {
            push(`/community/${community.id}`);
        }
    };

    const handleDeleteACommunity = () => {
        dispatch(deleteCommunityPostThunk({ postId: community.id }));
    };

    const handleToggleCommunityLike = () => {
        dispatch(toggleCommunityPostLikeThunk({ postId: community.id }));
    };

    return (
        <div className="relative flex size-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 my-4 backdrop-blur-md shadow-xl">
            <div className="flex flex-row justify-between tracking-tight">
                <div className="flex w-full justify-between">
                    <div className="flex items-center space-x-2">
                        <UserAvatar2 user={community.owner} />
                        <div>
                            <Link
                                href="#"
                                className="flex items-center whitespace-nowrap font-semibold"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {community.owner.name}
                            </Link>
                            <div className="flex items-center space-x-1">
                                <Link href="#" className="text-sm text-gray-500 transition-all duration-75">
                                    @{community.owner.username}
                                </Link>
                            </div>
                        </div>
                    </div>
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
                                <React.Fragment>
                                    <DropdownMenuItem onClick={() => setIsEditable(true)}>
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
                                </React.Fragment>
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
                                    <Button variant="destructive" onClick={handleDeleteACommunity}>
                                        Confirm
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {(isEditable || isEditing) && (
                <form className="relative" onSubmit={onSubmitEditForm}>
                    <Textarea
                        defaultValue={community.text}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="break-words w-full"
                        required
                        placeholder="Write something..."
                    />
                    <Button variant="outline" size="icon" type="submit" className="absolute right-2 bottom-2">
                        <span className="sr-only">Submit</span>
                        {isEditing ? (
                            <LoaderIcon className="h-4 w-4 animate-spin" />
                        ) : (
                            <SendHorizonalIcon className="h-4 w-4" />
                        )}
                    </Button>
                </form>
            )}
            <section className="flex flex-col cursor-pointer" onClick={handleCommunityClick}>
                {!isEditable && !isEditing && (
                    <div className="break-words leading-normal tracking-tight px-3">{community.text}</div>
                )}
                <div className="flex flex-1 items-center justify-center px-3 mt-2">
                    {community.images.map((image, i) => (
                        <Image
                            key={i}
                            className="w-full aspect-video shrink-0 snap-center snap-always rounded-xl border-2 border-primary/50 object-cover shadow-sm"
                            src={image}
                            alt=""
                            width={400}
                            height={400}
                        />
                    ))}
                </div>
            </section>
            <div className="flex px-3 justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="ghost2"
                        size="icon"
                        onClick={handleToggleCommunityLike}
                        className="hover:scale-[1.02] focus-visible:scale-100"
                    >
                        <span className="sr-only">Like</span>
                        <HeartIcon className={`h-4 w-4 ${community.isLiked && "fill-red-500 text-red-500"}`} />
                    </Button>
                    <span className="flex items-center justify-center">{community.likes ?? 0}</span>
                </div>
                <Button variant="link" className="flex gap-2" onClick={handleCommunityClick}>
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

export default CommunityCard;
