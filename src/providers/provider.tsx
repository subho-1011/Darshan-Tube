import React from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClientProviderWrapper } from "@/providers/QueryClientProviderWrapper";
import ReduxStoreProvider from "./redux-store-provider";

import { Footer, Header, Sidebar } from "@/components/layout";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ReduxStoreProvider>
                    <QueryClientProviderWrapper>
                        <div className="flex flex-col min-h-screen h-auto">
                            <Header />
                            <div className="flex flex-1 overflow-hidden">
                                <Sidebar />
                                <main className="flex-1 overflow-auto">
                                    {children}
                                </main>
                            </div>
                            <Footer />
                        </div>
                    </QueryClientProviderWrapper>
                </ReduxStoreProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
