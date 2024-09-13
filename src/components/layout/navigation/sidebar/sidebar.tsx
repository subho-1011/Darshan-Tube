"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Home,
    Compass,
    PlaySquare,
    Clock,
    ThumbsUp,
    Film,
    Gamepad,
    Newspaper,
    Trophy,
    Flame,
    Music2,
    Radio,
    Podcast,
    Clapperboard,
    Menu,
} from "lucide-react";
import Link from "next/link";

const NavItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
    separator?: boolean;
}[] = [
    {
        icon: <Home />,
        label: "Home",
        href: "/",
    },
    {
        icon: <Compass />,
        label: "Explore",
        href: "/explore",
        separator: true,
    },
    {
        icon: <PlaySquare />,
        label: "Playlists",
        href: "/playlists",
    },
    {
        icon: <Clock />,
        label: "Watch History",
        href: "/watch-history",
    },
    {
        icon: <ThumbsUp />,
        label: "Liked Videos",
        href: "/liked-videos",
        separator: true,
    },
    {
        icon: <Film />,
        label: "Movies",
        href: "/movies",
    },
    {
        icon: <Gamepad />,
        label: "Games",
        href: "/games",
    },
    {
        icon: <Newspaper />,
        label: "News",
        href: "/news",
    },
    {
        icon: <Trophy />,
        label: "Top Charts",
        href: "/top-charts",
    },
    {
        icon: <Flame />,
        label: "Trends",
        href: "/trends",
    },
    {
        icon: <Music2 />,
        label: "Songs",
        href: "/songs",
    },
    {
        icon: <Radio />,
        label: "Radio",
        href: "/radio",
    },
    {
        icon: <Podcast />,
        label: "Podcasts",
        href: "/podcasts",
    },
    {
        icon: <Clapperboard />,
        label: "Clips",
        href: "/clips",
    },
];

const NavItem = ({
    icon,
    label,
    herf,
    separator = false,
    isExpanded = false,
}: {
    icon: React.ReactNode;
    label: string;
    herf: string;
    separator?: boolean;
    isExpanded?: boolean;
}) => (
    <Link href={herf} className="w-full">
        <Button
            variant="ghost"
            className={`w-full justify-start items-center px-5 mb-2 mx-2`}
        >
            <span className="">{icon}</span>
            {isExpanded && <span className="ml-2">{label}</span>}
        </Button>
        {separator && <div className="border-t w-full h-1" />}
    </Link>
);

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => setIsExpanded(!isExpanded);

    return (
        <aside
            className={`border-border/40 transition-all duration-300 z-30 ${
                isExpanded ? "w-48" : "w-20"
            }`}
        >
            <div className="flex justify-start ml-2">
                <Button variant="ghost" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-56px)] flex flex-col gap-3">
                {NavItems.map(({ icon, label, href, separator }, index) => (
                    <NavItem
                        key={index}
                        icon={icon}
                        label={label}
                        herf={href}
                        separator={separator}
                        isExpanded={isExpanded}
                    />
                ))}
            </ScrollArea>
        </aside>
    );
}
