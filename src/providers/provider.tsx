"use client";

import React, { useEffect, useRef } from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClientProviderWrapper } from "@/providers/QueryClientProviderWrapper";

import { Footer, Header, Sidebar } from "@/components/layout";
import { AppStore, makeStore } from "@/store/store";
import { initialUser, setError, setUser } from "@/store/slices/user-slice";
import { getMe } from "@/actions/auth.actions";
import { Provider } from "react-redux";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    const store = useRef<AppStore>();

    if (!store.current) {
        store.current = makeStore();

        store.current.dispatch(initialUser());
    }

    const fetchUser = async () => {
        const response = await getMe();
        console.log(response);

        if (response.user) {
            store?.current?.dispatch(setUser(response.user));
        }

        if (response.error) {
            store?.current?.dispatch(setError(response.error));
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Provider store={store.current}>
                    <QueryClientProviderWrapper>
                        <div className="flex flex-col min-h-screen h-auto">
                            <Header />
                            <div className="flex flex-1 overflow-hidden">
                                <Sidebar />
                                <main className="flex-1 overflow-auto">{children}</main>
                            </div>
                            <Footer />
                        </div>
                    </QueryClientProviderWrapper>
                </Provider>
            </ThemeProvider>
        </SessionProvider>
    );
}
