import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/user-slice";
import videosReducer from "@/store/slices/videos-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            videos: videosReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
