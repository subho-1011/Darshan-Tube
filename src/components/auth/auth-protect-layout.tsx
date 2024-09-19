"use client";

import { useAppSelector } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { forwardRef, ReactNode } from "react";

interface AuthProtectLayoutProps {
    children: ReactNode;
}

const AuthProtectLayoutComponent = forwardRef<HTMLSpanElement, AuthProtectLayoutProps>(
    function AuthProtectLayout({ children }, ref) {
        const router = useRouter();
        const { status } = useAppSelector((state) => state.user);

        useEffect(() => {
            if (status === "unauthenticated") {
                router.push("/auth/login");
            }
        }, [status, router]);

        return <span ref={ref}>{children}</span>;
    }
);

export const AuthProtectLayout = AuthProtectLayoutComponent;
