import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClientProviderWrapper } from "@/providers/QueryClientProviderWrapper";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <QueryClientProviderWrapper>
                    {children}
                </QueryClientProviderWrapper>
            </SessionProvider>
        </ThemeProvider>
    );
}
