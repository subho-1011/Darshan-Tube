"use client";

import { useHomePage } from "@/hooks";
import { VideoContainer, VideosPageWrapper } from "@/components/videos";

const HomePage = () => {
    const {
        pages,
        totalPages,
        currentPage,
        isLoading,
        error,
        paginate,
        goToNextPage,
        goToPreviousPage,
        sortBy,
        selectSortBy,
    } = useHomePage();
    return (
        <VideosPageWrapper
            pageTitle="Home page"
            totalPages={totalPages}
            currentPage={currentPage}
            isLoading={isLoading}
            error={error}
            paginate={paginate}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            sort={sortBy}
            selectSortBy={selectSortBy}
        >
            <VideoContainer name="Home page" videos={pages[currentPage]?.videos || []} />
        </VideosPageWrapper>
    );
};

export default HomePage;
