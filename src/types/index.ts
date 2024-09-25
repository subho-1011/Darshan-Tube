import { User, Video, VideoComment } from "@prisma/client";

export type TUser = User;

export type TBasicUser = Pick<TUser, "id" | "name" | "image" | "username">;

export type TVideo = Video & {
    owner: TBasicUser;
};

export type TOwnerWithSubscribers = TBasicUser & {
    subscribers: number;
    isSubscribed: boolean;
};

export type TVideoWithUser = TVideo & {
    isOwner: boolean;
    likes: number;
    isLiked: boolean;
    tags: string[];
    owner: TOwnerWithSubscribers;
};

export type TVideoComment = VideoComment & {
    likes: number;
    isLiked: boolean;
    isOwner: boolean;
    noOfReplies: number;
    owner: TBasicUser;
    replies: TVideoComment[];
};
