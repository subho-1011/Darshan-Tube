"use client";

import { useAppSelector } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { forwardRef, ReactNode } from "react";

export const AuthProtectLayout = forwardRef<
    HTMLSpanElement,
    { children: ReactNode }
>(({ children }, ref) => {
    const router = useRouter();

    const { status } = useAppSelector((state) => state.user);

    const handleClick = () => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    };

    return (
        <span ref={ref} onClick={handleClick}>
            {children}
        </span>
    );
});
