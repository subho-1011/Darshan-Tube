"use server";

import { auth } from "@/auth";

export const getCurrentUserId = async () => {
    try {
        const session = await auth();
        const user = session?.user;

        return user?.id ? user.id : null;
    } catch (error) {
        return null;
    }
};
