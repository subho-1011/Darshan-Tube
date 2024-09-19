import { User } from "@prisma/client";

export type TUser = User;

export type TUserAuth = {
    user: TUser | null;
    login: (user: TUser) => void;
    logout: () => void;
    error: string | null;
    setError: (error: string | null) => void;
};
