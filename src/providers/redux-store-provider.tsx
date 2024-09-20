"use client";

import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";

import { initialUser, setError, setUser } from "@/store/slices/user-slice";
import { AppStore, makeStore } from "@/store/store";
import { getMe } from "@/actions/auth.actions";
import { useSession } from "next-auth/react";
import { VscLoading } from "react-icons/vsc";
import WelcomePageSkeleton from "@/components/skeleton/welcome-page-skeleton";

type ReduxStoreProviderProps = {
    children: React.ReactNode;
};

const ReduxStoreProvider = ({ children }: ReduxStoreProviderProps) => {
    const store = useRef<AppStore>();
    const [userLoading, setUserLoading] = useState(true);
    const { status } = useSession();

    if (!store.current) {
        store.current = makeStore();

        store.current.dispatch(initialUser());
    }

    const fetchUser = async () => {
        try {
            const response = await getMe();

            if (response.user) {
                store?.current?.dispatch(setUser(response.user));
            }

            if (response.error) {
                store?.current?.dispatch(setError(response.error));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            store?.current?.dispatch(setError("Failed to fetch user data"));
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            {userLoading || status === "loading" ? (
                <div className="flex min-h-screen w-screen items-center justify-center">
                    <VscLoading size={160} className="animate-spin" />
                </div>
            ) : (
                <Provider store={store.current}>{children}</Provider>
            )}
        </>
    );
};

export default ReduxStoreProvider;
