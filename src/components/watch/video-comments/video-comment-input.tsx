"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useVideoCommentsActions, useVideoCommentsState } from "@/hooks/watch";

const VideoCommentInput = () => {
    const { isPostingNewComment } = useVideoCommentsState();
    const { commentText, updateCommentText, handlePostNewComment } = useVideoCommentsActions();

    return (
        <form onSubmit={handlePostNewComment} className="mb-6">
            <Textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => updateCommentText(e.target.value)}
                className="mb-2"
            />
            <Button type="submit" disabled={!commentText.trim() || isPostingNewComment}>
                {isPostingNewComment && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                Comment
            </Button>
        </form>
    );
};

export default VideoCommentInput;
