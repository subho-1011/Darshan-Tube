"use server";

import { z } from "zod";
import { LoginFormSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const loginUser = async (
    data: z.infer<typeof LoginFormSchema>,
    callbackUrl?: string | undefined | null
) => {
    const validateData = LoginFormSchema.safeParse(data);

    if (!validateData.success) {
        return { error: "Validation failed" };
    }

    const { email, password } = validateData.data;

    try {
        await signIn("credentials", {
            email,
            password,
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
