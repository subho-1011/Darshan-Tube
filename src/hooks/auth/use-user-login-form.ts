"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { LoginFormSchema } from "@/schemas";

import { loginUser } from "@/actions/auth.actions";

export const useUserLoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false);

    const [isPending, startTransition] = useTransition();

    const togglePassword = () => setShowPassword((prev) => !prev);

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            loginUser(data, callbackUrl).then((res) => {
                if (res?.error) {
                    setError(res.error);
                }
                if (res?.success) {
                    setSuccess(res.success);
                }
            });
        });
    };

    return {
        form,
        error,
        success,
        isPending,
        showPassword,
        onSubmit,
        togglePassword,
    };
};
