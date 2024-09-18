import axios, { AxiosError } from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

interface UserState {
    user: User | null;
    status: "authenticated" | "loading" | "unauthenticated";
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: "unauthenticated",
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axios.get(`/api/auth/get-me`);
        console.log(response);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) {
            throw new Error(`${error.response?.data?.error || error.message}`);
        }
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initialUser: (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
        },

        loadingUser: (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
        },

        setUser: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.status = "authenticated";
            state.user = action.payload;
        },

        userLogin: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.status = "authenticated";
            state.loading = false;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.status = "authenticated";
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.status = "unauthenticated";
            state.error = action.error.message || "Failed to fetch user";
        });
    },
});

export const { initialUser, setUser, setError, logout } = userSlice.actions;

export default userSlice.reducer;
