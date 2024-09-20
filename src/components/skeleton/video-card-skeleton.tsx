import { Skeleton } from "@/components/ui/skeleton";

export function VideoCardSkeleton() {
    return (
        <div className="overflow-hidden border-0">
            <div className="p-0">
                <Skeleton className="aspect-video w-full object-cover rounded-2xl" />
                <div className="p-4">
                    <div className="flex items-start space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1 w-full">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
