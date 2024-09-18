"use client";

import { DarshanLogo } from "@/components/logo";

export const AuthCardHeader = ({ label }: { label: string }) => {
    return (
        <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
            <DarshanLogo />
            <h1 className="text-3xl font-semibold">DarshanTube</h1>
            <p className=" text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
