"use client";

import Image from "next/image";

export const AuthCardHeader = ({ label }: { label: string }) => {
    return (
        <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
            <Image src="/darshan-logo.png" alt="logo" height={50} width={50} />
            <h1 className="text-3xl font-semibold">DarshanTube</h1>
            <p className=" text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
