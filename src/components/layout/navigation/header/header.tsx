"use client";

import React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import LoginUserButton from "./login-user-button";
import HeaderUploadButton from "./header-upload-button";
import { DarshanLogo } from "@/components/logo";

const Header: React.FC = () => {
    return (
        <header className="top-0 sticky bg-background/95 backdrop-blur flex items-center justify-between px-4 lg:px-24 md:px-16 sm:px-8 py-3 z-50 border-border/40">
            <div className="flex items-center">
                <Link href="/" className="flex items-center justify-center">
                    <DarshanLogo />
                    <span className="text-2xl tracking-wider font-bold ml-1">
                        Darshan Tube
                    </span>
                </Link>
            </div>
            <div className="flex-1 max-w-2xl mx-4">
                <form className="flex items-center border rounded-2xl">
                    <Input
                        className="flex-grow rounded-2xl rounded-r-none py-2"
                        placeholder="Search"
                        type="search"
                    />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="rounded-2xl rounded-l-none"
                    >
                        <Search className="h-6 w-6" />
                        <span className="sr-only">Search</span>
                    </Button>
                </form>
            </div>
            <div className="flex items-center space-x-5">
                <HeaderUploadButton />
                <button className="opacity-75 hover:opacity-100">
                    <Bell className="h-6 w-6" />
                    <span className="sr-only">Notifications</span>
                </button>
                <LoginUserButton />
            </div>
        </header>
    );
};

export default Header;
