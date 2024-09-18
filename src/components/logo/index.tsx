"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DarshanLogo = ({ className }: { className?: string }) => {
    const router = useRouter();
    return (
        <Button
            variant="link"
            className="flex items-center justify-center hover:no-underline"
            asChild
            onClick={() => router.push("/")}
        >
            <img
                src="/darshan-logo.png"
                alt="darshan-logo"
                className={cn("h-6 w-auto", className)}
            />
        </Button>
    );
};
