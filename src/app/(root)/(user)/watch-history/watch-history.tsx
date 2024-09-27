import { TWatchHistoryVideoCard } from "@/types";
import WatchHistoryVideoCard from "./watch-history-video-card";

const WatchHistory: React.FC<{ videos: TWatchHistoryVideoCard[] | null }> = ({ videos }) => {
    if (!videos || videos.length === 0) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-6">No videos found</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {videos.map((video) => (
                <WatchHistoryVideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

export default WatchHistory;
