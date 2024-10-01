"use client";

import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/common";
import { CommunityCard } from "@/components/community";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn, useAppDispatch, useAppSelector } from "@/lib/utils";
import { Heart, LoaderIcon, SendHorizonalIcon } from "lucide-react";

import { timeAgo } from "@/utils";
import { useCommunityDialog, useACommunityPostData } from "@/hooks/community";
import {
    postCommentOnCommunityPostThunk,
    toggleCommunityPostCommentLikeThunk,
} from "@/store/thunk-api/community.thunkapi";

const CommunityCardDialog: React.FC<{
    params: { communityId: string };
}> = ({ params }) => {
    const { openDialog, handleDialogOpen } = useCommunityDialog();
    const { postData, isLoading, isCommentsLoading, errorMsg } = useACommunityPostData(params.communityId);

    if (!postData || errorMsg) {
        return (
            <Dialog>
                <DialogContent className="flex max-w-5xl h-[70%] p-10">
                    <div className="flex w-full justify-center items-center">{errorMsg || "Something went wrong"}</div>
                </DialogContent>
            </Dialog>
        );
    }

    if (isLoading) {
        return (
            <Dialog>
                <DialogContent className="flex max-w-5xl h-[70%] p-10">
                    <div className="flex w-full justify-center items-center">
                        <LoaderIcon className="h-4 w-4 animate-spin" />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={openDialog} onOpenChange={handleDialogOpen}>
            <DialogContent className="flex max-w-5xl h-[70%] p-10">
                <CommunityCard community={postData} mode="modal" />
                <section className="w-1/2 rounded-2xl bg-primary-foreground h-full px-2 py-5 my-3 flex flex-col">
                    <InputCommentForm postId={postData.id} />
                    <h5 className="mt-3 font-bold underline">Comments</h5>
                    <div className="flex-1 overflow-auto flex flex-col">
                        {isCommentsLoading ? (
                            <div className="flex w-full justify-center items-center">
                                <LoaderIcon className="h-4 w-4 animate-spin" />
                            </div>
                        ) : (
                            <Comments postId={postData.id} />
                        )}
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
};

const InputCommentForm: React.FC<{ postId: string }> = ({ postId }) => {
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.community);
    const [commentText, setCommentText] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(postCommentOnCommunityPostThunk({ postId, text: commentText }));
        setCommentText("");
    };

    return (
        <form onSubmit={onSubmit} className="flex w-full items-center justify-center space-x-2">
            <div className="relative w-full z-0">
                <input
                    type="text"
                    name="text"
                    id="floating_standard"
                    className="block py-2.5 px-0 w-full text-sm text-primary rounded-none bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    autoComplete="off"
                />
                <label
                    htmlFor="floating_standard"
                    className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-0 ring-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                    post a comment
                </label>
            </div>
            <Button type="submit" variant="outline" size="icon">
                {loading.createAPostComment ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                    <SendHorizonalIcon className="h-4 w-4" />
                )}
            </Button>
        </form>
    );
};

const Comments: React.FC<{ postId: string }> = ({ postId }) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.community.commentsOnAPost[postId]);

    const handleToggleCommunityCommentLike = (commentId: string) => {
        dispatch(toggleCommunityPostCommentLikeThunk({ postId, commentId }));
    };

    return (
        <React.Fragment>
            {comments &&
                comments?.map((comment) => (
                    <div key={comment.id} className="flex space-x-2 my-2">
                        <UserAvatar
                            username={comment.owner.username}
                            src={comment.owner.image}
                            name={comment.owner.name}
                        />
                        <div className="flex flex-col space-x-2">
                            <div className="grow">
                                <span className="flex items-center space-x-3">
                                    <Link href={`/@${comment.owner.username}`}>
                                        <p className="font-bold">{comment.owner.username}</p>
                                    </Link>
                                    <p className="text-sm text-muted-foreground">{timeAgo(comment.createdAt)}</p>
                                </span>
                                <p className="text-sm">{comment.text}</p>
                            </div>
                            <Button
                                variant="ghost2"
                                size="icon"
                                className="ml-auto"
                                onClick={() => handleToggleCommunityCommentLike(comment.id)}
                            >
                                <Heart
                                    className={cn("h-4 w-4 mr-1", {
                                        "text-red-500 fill-red-500": comment.isLiked,
                                    })}
                                />
                                <span className="text-sm">{comment.likes}</span>
                            </Button>
                        </div>
                    </div>
                ))}
        </React.Fragment>
    );
};

export default CommunityCardDialog;
