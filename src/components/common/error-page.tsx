"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    // props
    pageTitle?: string;
    message?: string;
};

const ErrorPage: React.FC<Props> = ({ pageTitle, message }) => {
    const router = useRouter();

    return (
        <div className="py-8 flex flex-col items-center min-h-screen w-full">
            <div className="text-center space-y-6">
                <h1 className="text-7xl font-bold mb-16">🫡 Oops!</h1>
                <h2 className="text-4xl font-semibold">Something went wrong - {pageTitle}</h2>
                <p className="text-xl">{message}</p>
                <Button variant="link" onClick={() => router.refresh()} className="text-xl">
                    try again
                </Button>
                {/* go back button or home page button */}
                <div className="flex justify-center space-x-10">
                    <Button variant="outline" onClick={() => router.back()}>
                        Go to previous page
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Go to home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
