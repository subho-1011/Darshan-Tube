// whole page skeleton with navbar, sider, footer

import { Skeleton } from "../ui/skeleton";
import SkeletonContainer from "./skeleton-container";

export default function WelcomePageSkeleton() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="flex justify-between items-center bg-secondary/90 h-16 w-full">
                <Skeleton className="w-48 h-12" />
                <Skeleton className="w-48 h-12" />
                <Skeleton className="w-48 h-12" />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <Skeleton className="w-48" />
                <div className="flex-1 overflow-auto py-8">
                    <SkeletonContainer />
                </div>
            </div>
        </div>
    );
}
