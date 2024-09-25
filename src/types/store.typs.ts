import { TVideoComment, TVideoWithUser } from "@/types";

export interface CommentsState {
    page: number;
    limit: number;
    totalComments: number;
    comments: TVideoComment[] | null;
    commentsError: string | null;
    commentsLoading: boolean;
}

export interface VideoPlayerState {
    videoSlug: string | null;
    video: TVideoWithUser | null;
    comments: CommentsState;
    videoError: string | null;
    videoLoading: boolean;
    globalError: {
        [key: string]: string | null;
    };
    loading: {
        [key: string]: boolean;
    };
}
