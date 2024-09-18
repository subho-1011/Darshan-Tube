import { useAppSelector } from "@/lib/utils";

export const useCurrentUser = () => {
    const { user } = useAppSelector((state) => state.user);

    return user;
};
