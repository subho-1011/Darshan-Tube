"use client";

import { TBasicDataOfVideoWithUser } from "@/types";
import { MoreButtonWrapper, VideoCardWrapper } from "@/components/card";

interface VideoCardProps {
    video: TBasicDataOfVideoWithUser;
}

const LikedVideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <VideoCardWrapper video={video}>
            <MoreButtonWrapper />
        </VideoCardWrapper>
    );
};

export default LikedVideoCard;
