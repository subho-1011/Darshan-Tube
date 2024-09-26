"use client";

import { ReactNode } from "react";
import { PaginationBar } from "@/components/common";
import ErrorPage from "@/components/common/error-page";
import SkeletonContainer from "@/components/skeleton/skeleton-container";
import { SortingSelect } from "../common/sorting-select";

interface VideosPageWrapperProps {
    pageTitle: string;
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    paginate: (pageNumber: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    sort: string;
    selectSortBy: (sortBy: string) => void;
    children: ReactNode; // Page-specific content
}

export const VideosPageWrapper: React.FC<VideosPageWrapperProps> = ({
    pageTitle,
    totalPages,
    currentPage,
    isLoading,
    error,
    paginate,
    goToNextPage,
    goToPreviousPage,
    sort,
    selectSortBy,
    children,
}) => {
    if (error) {
        return <ErrorPage pageTitle={pageTitle} />;
    }

    return (
        <div className="py-8 flex flex-col min-h-screen">
            <div className="flex justify-between px-4">
                <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
                <SortingSelect sort={sort} selectSortBy={selectSortBy} />
            </div>

            {/* Page-specific content */}
            {isLoading ? <SkeletonContainer /> : children}

            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
            />
        </div>
    );
};
