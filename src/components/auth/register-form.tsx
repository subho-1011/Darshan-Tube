"use client";

import { CardWrapper } from "@/components/auth/auth-card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormError, FormSuccess } from "@/components/common";

import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useUserRegterForm } from "@/hooks/auth";

export const RegisterForm = () => {
    const {
        form,
        error,
        success,
        showPassword,
        togglePassword,
        onSubmit,
        isPending,
        isError,
        isSuccess,
    } = useUserRegterForm();

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Mr chandra gupta"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="gupta123"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="mr.chandragupta@gmail.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <span className="relative flex items-center">
                                            <Input
                                                {...field}
                                                placeholder={
                                                    showPassword
                                                        ? "Abcdef1!"
                                                        : "********"
                                                }
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                disabled={isPending}
                                            />
                                            <span
                                                className="absolute end-3 cursor-pointer"
                                                onClick={togglePassword}
                                            >
                                                {showPassword ? (
                                                    <EyeIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeOffIcon className="h-5 w-5" />
                                                )}
                                            </span>
                                        </span>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isError && <FormError message={error} />}
                        {isSuccess && <FormSuccess message={success} />}
                    </div>
                    <Button
                        className="w-full"
                        size="lg"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending && <Loader className=" animate-spin mr-3" />}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
