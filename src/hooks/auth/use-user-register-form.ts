"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RegisterFormSchema } from "@/schemas";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth.api";
import { AxiosError } from "axios";

export const useUserRegterForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword((prev) => !prev);

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        error: apiError,
    } = useMutation({
        mutationFn: (data: z.infer<typeof RegisterFormSchema>) => registerUser(data),
        onSuccess: () => {
            setSuccess("Registration successful!");
            form.reset();
            setTimeout(() => {
                router.push("/auth/login");
            }, 1000);
        },
        onError: (err: unknown) => {
            console.log(err);
            if (err instanceof AxiosError)
                setError(err?.response?.data?.error || "Registration failed.");
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterFormSchema>) => {
        setError("");
        setSuccess("");

        mutate(data);
    };

    return {
        form,
        error,
        success,
        showPassword,
        togglePassword,
        onSubmit,
        isPending,
        isError,
        isSuccess,
        apiError,
    };
};
