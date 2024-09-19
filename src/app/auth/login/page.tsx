"use client";

import { LoginForm } from "@/components/auth";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;
