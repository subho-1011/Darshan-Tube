import NextAuth from "next-auth";

import { NextResponse } from "next/server";

import authConfig from "@/auth.config";
import {
    apiPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    privateRoutes,
    publicApiRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute =
        privateRoutes.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith("/profile");

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isPrivateRoute && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;

        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }

    if (
        nextUrl.pathname.startsWith(apiPrefix) &&
        publicApiRoutes.includes(nextUrl.pathname)
    ) {
        const user = !!req.auth?.user;
        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }
    }
    return NextResponse.next();
});

const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
