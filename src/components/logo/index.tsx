"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const DarshanLogo = ({ className }: { className?: string }) => {
    const router = useRouter();
    return (
        <Button
            variant="link"
            className="flex items-center justify-center hover:no-underline"
            asChild
            onClick={() => router.push("/")}
        >
            <Image
                src="/darshan-logo.png"
                alt="darshan-logo"
                width={100}
                height={60}
                className={cn("h-6 w-auto", className)}
            />
        </Button>
    );
};
