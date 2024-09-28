"use client";

import React, { useState } from "react";

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
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bookmark, ListPlusIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";

interface MoreButtonProps {
    haveDeleteButton?: boolean;
    deleteButtonLabel?: string;
    deleteItemName?: string;
    onDelete?: () => void;
    children?: React.ReactNode;
}

const MoreButtonWrapper: React.FC<MoreButtonProps> = ({
    haveDeleteButton = false,
    deleteButtonLabel = "Delete",
    deleteItemName,
    onDelete,
    children,
}) => {
    if (haveDeleteButton && !onDelete) {
        throw new Error("onDelete is required if haveDeleteButton is true");
    }

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

    const handleDelete = () => {
        if (onDelete) onDelete();
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
                    {children}

                    <DropdownMenuItem>
                        <ListPlusIcon className="h-4 w-4 mr-2" />
                        Add to playlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                    </DropdownMenuItem>

                    {haveDeleteButton && (
                        <DropdownMenuItem
                            onClick={() => setIsOpenDeleteDialog(true)}
                            className="text-destructive hover:text-destructive/90"
                        >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            {deleteButtonLabel}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete from {deleteItemName || "here"}.
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

export default MoreButtonWrapper;
