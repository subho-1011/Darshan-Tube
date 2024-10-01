"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TBasicUser } from "@/types";

const UserAvatar2: React.FC<{
    user: TBasicUser;
}> = ({ user }) => {
    const router = useRouter();

    return (
        <Avatar
            className={cn(`cursor-pointer w-10 h-10`)}
            onClick={() => router.push(`/@${user.username?.toLocaleLowerCase()}`)}
        >
            <AvatarImage src={user.image || ""} alt={user.name || "user avatar"} />
            <AvatarFallback>{user.name?.charAt(0) ? user.name?.charAt(0).toUpperCase() : <User2Icon />}</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar2;
