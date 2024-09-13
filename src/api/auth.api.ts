import axios from "axios";
import { RegisterFormSchema } from "@/schemas";

export const registerUser = async (
    userData: Zod.infer<typeof RegisterFormSchema>
) => {
    const response = await axios.post("/api/auth/register", userData);
    return response.data;
};
