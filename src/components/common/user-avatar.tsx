"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarProps = {
    name: string | null;
    username: string | null;
    src: string | null;
    size?: number;
    className?: string;
};

/**
 * A user avatar component that displays a user's profile picture and
 * username. Clicking on the avatar will take the user to the user's
 * profile page.
 *
 * @param {string} name - The user's name.
 * @param {string} username - The user's username.
 * @param {string} src - The URL of the user's profile picture.
 * @param {number} [size=40] - The size of the avatar in pixels.
 * @param {string} [className] - Additional class names to add to the avatar.
 */
export const UserAvatar: React.FC<AvatarProps> = ({
    name,
    username,
    src,
    size = 40,
    className,
}) => {
    const router = useRouter();

    return (
        <Avatar
            className={cn(`cursor-pointer w-${size / 4} h-${size / 4}`, className)}
            onClick={() => router.push(`/@${username?.toLocaleLowerCase()}`)}
        >
            <AvatarImage src={src || ""} alt={name || ""} />
            <AvatarFallback>
                {name?.charAt(0) ? name?.charAt(0).toUpperCase() : <User2Icon />}
            </AvatarFallback>
        </Avatar>
    );
};
