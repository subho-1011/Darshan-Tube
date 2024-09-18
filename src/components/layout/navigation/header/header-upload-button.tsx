"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PenSquareIcon, PlaySquareIcon, UploadIcon } from "lucide-react";

import { AuthProtectLayout } from "@/components/auth";
import { useAppSelector } from "@/lib/utils";

const HeaderUploadButton: React.FC = () => {
    const router = useRouter();

    const { user } = useAppSelector((state) => state.user);
    const userId = user?.id;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="opacity-75 hover:opacity-100"
                >
                    <UploadIcon className="h-6 w-6" />
                    <span className="sr-only">Upload</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <AuthProtectLayout>
                    <DropdownMenuItem
                        onClick={() => router.push(`/channel/${userId}/upload`)}
                    >
                        <PlaySquareIcon className="h-4 w-4 mr-2" />
                        Upload video
                    </DropdownMenuItem>
                </AuthProtectLayout>
                <AuthProtectLayout>
                    <DropdownMenuItem onClick={() => router.push("/community")}>
                        <PenSquareIcon className="h-4 w-4 mr-2" />
                        Create post
                    </DropdownMenuItem>
                </AuthProtectLayout>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default HeaderUploadButton;
