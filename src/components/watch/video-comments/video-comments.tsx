import { useAppSelector } from "@/lib/utils";
import VideoCommentCard from "./video-comment-card";

const VideoComments: React.FC = () => {
    const { comments } = useAppSelector((state) => state.videoPlayer.comments);

    return (
        <div className="space-y-4">
            {comments &&
                comments.map((comment) => <VideoCommentCard key={comment.id} comment={comment} />)}
        </div>
    );
};

export default VideoComments;
