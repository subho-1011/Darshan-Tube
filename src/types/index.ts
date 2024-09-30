import { SortByOptions } from "@/constant";
import { CommunityPost, User, Video, VideoComment } from "@prisma/client";

export type TUser = User;

export type TBasicUser = Pick<TUser, "id" | "name" | "image" | "username">;

export type TBasicDataOfVideo = Pick<TVideo, "id" | "title" | "slug" | "thumbnailUrl" | "views" | "createdAt">;

export type TVideo = Video & {
    owner: TBasicUser;
};

export type TBasicDataOfVideoWithUser = TBasicDataOfVideo & {
    owner: TBasicUser;
};

export type TWatchHistoryVideoCard = TBasicDataOfVideo & {
    timestamp: number;
    watchedAt: Date;
};

export type TOwnerWithSubscribers = TBasicUser & {
    subscribers: number;
};

export type TVideoWithUser = TVideo & {
    isOwner: boolean;
    likes: number;
    isLiked: boolean;
    isSubscribed: boolean;
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

export type TCommunityPost = CommunityPost & {
    likes: number;
    isLiked: boolean;
    isOwner: boolean;
    owner: TBasicUser;
};

export type TCommunityPostComment = TCommunityPost & {
    likes: number;
    isLiked: boolean;
    isOwner: boolean;
    owner: TBasicUser;
};

export type SortType = (typeof SortByOptions)[number]["type"];
