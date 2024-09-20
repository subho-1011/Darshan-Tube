"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
    currentPage,
    totalPages,
    paginate,
    goToNextPage,
    goToPreviousPage,
}) => {
    return (
        <div className="flex justify-between mx-8 mt-8">
            <Button
                variant="outline"
                className="mr-2"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous page
            </Button>
            <div className="flex items-center">
                {currentPage > 1 && (
                    <>
                        <span className="mx-2">...</span>
                        <Button
                            variant="outline"
                            className="mx-2"
                            onClick={() => paginate(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </Button>
                    </>
                )}
                <Button variant="outline" className="mx-2" disabled>
                    {currentPage}
                </Button>
                {currentPage < totalPages && (
                    <>
                        <Button
                            variant="outline"
                            className="mx-2"
                            onClick={() => paginate(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </Button>
                        <span className="mx-2">...</span>
                    </>
                )}
            </div>
            <Button
                variant="outline"
                className="ml-2"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                Next page
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
};
