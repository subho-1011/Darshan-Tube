import VideoDownloadButton from "./video-download-button";
import VideoLikedButton from "./video-like-button";
import VideoMoreButton from "./video-more-button";
import VideoShareButton from "./video-share-button";

export const VideoActionsButtons = () => {
    return (
        <section id="video-actions" className="flex gap-2">
            <VideoLikedButton />
            <VideoShareButton />
            <VideoDownloadButton />
            <VideoMoreButton />
        </section>
    );
};
