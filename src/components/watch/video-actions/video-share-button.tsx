import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const VideoShareButton = () => {
    return (
        <Button variant="outline" className="flex gap-2">
            <Share2 className="h-4 w-4" />
            Share
        </Button>
    );
};

export default VideoShareButton;
