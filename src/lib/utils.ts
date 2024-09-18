import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/store/store";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;