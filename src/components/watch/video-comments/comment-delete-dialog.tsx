"use client";

import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
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
import { useVideoCommentsActions } from "@/hooks/watch";

const CommentDeleteDialog: React.FC<{ commentId: string }> = ({ commentId }) => {
    const { deleteComment } = useVideoCommentsActions();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <MdDeleteForever size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Comment</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this comment?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={() => deleteComment(commentId)}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDeleteDialog;
