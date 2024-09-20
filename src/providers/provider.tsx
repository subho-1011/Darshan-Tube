"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClientProviderWrapper } from "@/providers/QueryClientProviderWrapper";

import ReduxStoreProvider from "./redux-store-provider";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ReduxStoreProvider>
                    <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
                </ReduxStoreProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
