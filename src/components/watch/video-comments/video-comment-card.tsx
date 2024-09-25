"use client";

import React from "react";
import { TVideoComment } from "@/types";
import { UserAvatar } from "@/components/common";
import CommentEditDialog from "./comment-edit-dialog";
import CommentDeleteDialog from "./comment-delete-dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const VideoCommentCard: React.FC<{ comment: TVideoComment }> = ({ comment }) => {
    return (
        <>
            <div className="flex gap-4">
                <UserAvatar
                    src={comment.owner.image}
                    name={comment.owner.name}
                    username={comment.owner.username}
                />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.owner.name}</span>
                        <span className="text-sm text-gray-500">
                            {comment.createdAt.toLocaleString().substring(0, 10)}
                        </span>
                    </div>
                    <p>{comment.text}</p>
                    <div className="flex justify-start items-center space-x-2 mt-3">
                        <Button variant="ghost2" size="icon">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-sm">{comment.likes}</span>
                        </Button>
                        <Button variant="link">
                            <span className="text-sm">reply</span>
                        </Button>
                    </div>
                </div>
                {comment.isOwner && (
                    <div className="ml-auto flex space-x-2 justify-end top-0">
                        <CommentEditDialog comment={comment} />
                        <CommentDeleteDialog commentId={comment.id} />
                    </div>
                )}
            </div>
        </>
    );
};

export default VideoCommentCard;
