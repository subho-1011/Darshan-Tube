"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { initialUser, setUser } from "@/store/slices/user-slice";
import { AppStore, makeStore } from "@/store/store";
import { getMe } from "@/actions/auth.actions";

type ReduxStoreProviderProps = {
    children: React.ReactNode;
};

const ReduxStoreProvider = ({ children }: ReduxStoreProviderProps) => {
    const store = useRef<AppStore>();

    if (!store.current) {
        store.current = makeStore();

        store.current.dispatch(initialUser());
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getMe();
            console.log(response);

            if (response.user) {
                store?.current?.dispatch(setUser(response.user));
            }
        };

        fetchUser();
    }, []);

    return <Provider store={store.current}>{children}</Provider>;
};

export default ReduxStoreProvider;
