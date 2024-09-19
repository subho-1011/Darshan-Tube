"use client";

import { Session } from "next-auth";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSubMenu from "@/components/theme/theme-submenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, BellIcon, LogInIcon, Tv2Icon } from "lucide-react";

const UserButton: React.FC<{ session: Session | null }> = ({ session }) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-spacing-0.5 opacity-75 hover:opacity-100">
                    <Avatar>
                        {session?.user?.image && (
                            <AvatarImage src={session.user.image} alt="User logo" />
                        )}
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                        <span className="sr-only">User avatar</span>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {session ? (
                    <>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>My profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push(`/channel/${session.user?.id}`)}
                        >
                            <Tv2Icon className="mr-2 h-4 w-4" />
                            <span>My channel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/profile/settings")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/notifications")}>
                            <BellIcon className="h-4 w-4" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                ) : null}
                <ThemeSubMenu />
                <DropdownMenuSeparator />
                {session ? (
                    <DropdownMenuItem className="space-x-2" onClick={async () => await signOut()}>
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        className="space-x-2"
                        onClick={() => router.push("/auth/login")}
                    >
                        <LogInIcon className="h-4 w-4" />
                        <span>Log in</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;
