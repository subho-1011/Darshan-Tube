"use client";

import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, BellIcon, LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSubMenu from "@/components/theme/theme-submenu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserButton: React.FC = () => {
    const router = useRouter();

    const [haveNotifications, setHaveNotifications] = useState(false);

    const { data } = useSession();
    const user = data?.user;

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const handleMyProfile = () => {
        // Implement your profile logic here
        // For example, open a modal or navigate to a profile page
    };

    const handleSettings = () => {
        // Implement your settings logic here
        // For example, open a modal or navigate to a settings page
    };

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-spacing-0.5 opacity-75 hover:opacity-100">
                    <Avatar>
                        {user?.image && (
                            <AvatarImage src={user?.image} alt="User logo" />
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
                {user ? (
                    <>
                        <DropdownMenuItem onClick={handleMyProfile}>
                            <User className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSettings}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span className="relative mr-2">
                                <BellIcon className="h-4 w-4" />
                                {haveNotifications && (
                                    <span className="animate-ping absolute top-0 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                )}
                            </span>
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ThemeSubMenu />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <ThemeSubMenu />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogin}>
                            <LogInIcon className="mr-2 h-4 w-4" />
                            <span>Log in</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;
