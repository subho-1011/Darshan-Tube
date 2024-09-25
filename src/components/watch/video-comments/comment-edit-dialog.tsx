"use client";

import { FaUserEdit } from "react-icons/fa";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useVideoCommentsActions, useVideoCommentsState } from "@/hooks/watch";
import { TVideoComment } from "@/types";
import { Loader2Icon } from "lucide-react";

const CommentEditDialog: React.FC<{ comment: TVideoComment }> = ({ comment }) => {
    const { isUpdatingComment } = useVideoCommentsState();
    const { commentText, updateCommentText, handleCommentEdit } = useVideoCommentsActions();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateCommentText(comment.text)}
                >
                    <FaUserEdit size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Comment</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => handleCommentEdit(e, comment.id)} className="mb-6">
                    <Textarea
                        placeholder="edit comment..."
                        value={commentText}
                        onChange={(e) => updateCommentText(e.target.value)}
                        className="mb-2"
                    />
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => updateCommentText("")}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild className="ml-4">
                        <Button type="submit" disabled={!commentText.trim() || isUpdatingComment}>
                            {isUpdatingComment && (
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save
                        </Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CommentEditDialog;
