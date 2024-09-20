"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface VideoSortingSelectProps {
    className?: string;
    sort: string;
    selectSortBy: (sortBy: string) => void;
}

export const VideoSortingSelect: React.FC<VideoSortingSelectProps> = ({ sort, selectSortBy }) => {
    return (
        <Select value={sort} onValueChange={selectSortBy}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">sort by newest</SelectItem>
                <SelectItem value="oldest">sort by oldest</SelectItem>
                <SelectItem value="mostViews">sort by most views</SelectItem>
                <SelectItem value="mostLikes">sort by most likes</SelectItem>
            </SelectContent>
        </Select>
    );
};
