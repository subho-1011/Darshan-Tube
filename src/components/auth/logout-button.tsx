"use client";

import { useRouter } from "next/navigation";

import { logoutUser } from "@/actions/auth.actions";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

export const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();

    const onClick = async () => {
        await logoutUser();
        router.push(DEFAULT_LOGOUT_REDIRECT);
    };
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
