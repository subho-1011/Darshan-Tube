"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import {
    AuthCardHeader as Header,
    AuthCardSocial as Social,
    AuthCardBackButton as BackButton,
} from "@/components/auth";

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}) => {
    return (
        <Card className="w-full m-10 sm:w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
