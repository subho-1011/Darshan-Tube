import * as z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});
