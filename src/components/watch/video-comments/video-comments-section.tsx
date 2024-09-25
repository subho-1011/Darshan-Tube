import { useVideoCommentsState } from "@/hooks/watch";
import CommentInput from "./video-comment-input";
import Comments from "./video-comments";
import LoadMoreCommentsButton from "./load-more-comments-button";

const VideoCommentsSection = () => {
    const { totalComments } = useVideoCommentsState();

    return (
        <section id="video-comments" className="mt-8">
            <h3 className="text-xl font-bold mb-4">{totalComments} comments</h3>
            <CommentInput />
            <Comments />
            <LoadMoreCommentsButton />
        </section>
    );
};

export default VideoCommentsSection;
