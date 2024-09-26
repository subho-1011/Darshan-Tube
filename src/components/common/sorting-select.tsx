"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SortByOptions } from "@/constant";
import { SortType } from "@/types";

interface SortingSelectProps {
    className?: string;
    sort: string;
    selectSortBy: (sortBy: SortType) => void;
}

export const SortingSelect: React.FC<SortingSelectProps> = ({
    sort,
    selectSortBy,
}) => {
    return (
        <Select value={sort} onValueChange={selectSortBy}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="sort by" />
            </SelectTrigger>
            <SelectContent>
                {SortByOptions.map((option) => (
                    <SelectItem key={option.type} value={option.type}>
                        {option.displayName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
