import { VideoUploadForm } from "@/components/videos/form";

type VideoUploadPageProps = {
    params: { channelId: string };
};

const VideoUploadPage: React.FC<VideoUploadPageProps> = () => {
    return (
        <div className="w-full flex items-center justify-center h-auto">
            <VideoUploadForm />
        </div>
    );
};

export default VideoUploadPage;
