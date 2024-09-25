import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoDownloadButton: React.FC<{
    videoUrl: string;
}> = ({ videoUrl }) => {
    return (
        <Button variant="outline" className="flex gap-2" asChild>
            <Download className="h-4 w-4" />
            Download
        </Button>
    );
};

export default VideoDownloadButton;
