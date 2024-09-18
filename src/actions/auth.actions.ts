"use server";

import { z } from "zod";
import { LoginFormSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { authRateLimiter } from "@/utils/auth-rate-limiter";
import { prismaDB } from "@/db/prisma";

export const loginUser = async (
    data: z.infer<typeof LoginFormSchema>,
    callbackUrl?: string | undefined | null
) => {
    const rateLimitResult = await authRateLimiter(data.email);

    if (!rateLimitResult.success) {
        return {
            error: "Too many login attempts. Please try again after some times.",
        };
    }

    const validateData = LoginFormSchema.safeParse(data);

    if (!validateData.success) {
        return { error: "Validation failed" };
    }

    const { email, password } = validateData.data;

    try {
        const validUser = await prismaDB.user.findUnique({
            where: { email },
        });

        if (validUser === null) {
            return { error: "User not found" };
        }

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });

        return { success: "Login successful" };
    } catch (err: any) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }

        // throw err;
    }
};

export const logoutUser = async () => {
    await signOut();
};
