import bycrpt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { prismaDB } from "@/db/prisma";

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                if (credentials) {
                    const { email, password } = credentials;

                    if (!email && !password) {
                        return null;
                    }

                    const user = await prismaDB.user.findUnique({
                        where: { email: email as string },
                    });

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatch = await bycrpt.compare(
                        password as string,
                        user.password
                    );

                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
