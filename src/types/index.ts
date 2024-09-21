import { User, Video } from "@prisma/client";

export type TUser = User;

export type TBasicUser = Pick<TUser, "id" | "name" | "image" | "username">;

export type TVideo = Video & {
    owner: TBasicUser;
};


