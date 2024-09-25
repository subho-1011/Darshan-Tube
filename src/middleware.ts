import NextAuth from "next-auth";

import { NextResponse } from "next/server";

import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
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
    const isPrivateRoute = privateRoutes.some((prefix) => nextUrl.pathname.startsWith(prefix));

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
        !isLoggedIn &&
        nextUrl.pathname.startsWith(apiPrefix) &&
        !nextUrl.pathname.startsWith(apiAuthPrefix) &&
        !publicApiRoutes.includes(nextUrl.pathname)
    ) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    return NextResponse.next();
});

const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
