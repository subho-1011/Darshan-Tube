"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { fetchUser, initialUser } from "@/store/slices/user-slice";
import { AppStore, makeStore } from "@/store/store";

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
        store?.current?.dispatch(fetchUser());
    }, []);

    return <Provider store={store.current}>{children}</Provider>;
};

export default ReduxStoreProvider;
