import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { prismaDB } from "@/db/prisma";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({}) {
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await prismaDB.user.findFirst({
                where: { id: token.sub },
            });
            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;

            return token;
        },
    },
    adapter: PrismaAdapter(prismaDB),
    session: { strategy: "jwt" },
    ...authConfig,
});
