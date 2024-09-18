"use client";

import { useAppSelector } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { forwardRef, ReactNode } from "react";

export const AuthProtectLayout = forwardRef<
    HTMLSpanElement,
    { children: ReactNode }
>(({ children }, ref) => {
    const router = useRouter();

    const { isAuthenticated, loading } = useAppSelector((state) => state.user);

    const handleClick = () => {
        if (!loading && !isAuthenticated) {
            router.push("/auth/login");
        }
    };

    return (
        <span ref={ref} onClick={handleClick}>
            {children}
        </span>
    );
});
