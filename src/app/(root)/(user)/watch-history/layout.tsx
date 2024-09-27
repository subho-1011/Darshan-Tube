import { Metadata } from "next";
import MoreVideosButton from "./more-video-button";

export const metadata: Metadata = {
    title: "Watch History",
    description: "Watch History Page of user",
};

export default function WatchHistoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto w-full px-4 py-8">
            {children}
            <MoreVideosButton />
        </div>
    );
}
