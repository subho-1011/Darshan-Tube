import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT_BY } from "@/constant";
import { SortType } from "@/types";
import { NextRequest } from "next/server";

export const getPaginationParams = (req: NextRequest) => {
    const page = req.nextUrl.searchParams.get("page") || DEFAULT_PAGE;
    const limit = req.nextUrl.searchParams.get("limit") || DEFAULT_LIMIT;
    const sortBy = req.nextUrl.searchParams.get("sortBy") || DEFAULT_SORT_BY;

    // convert string to number
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // validate sortBy
    if (["newest", "oldest", "mostViews", "mostLikes"].includes(sortBy)) {
        return { page: pageNumber, limit: limitNumber, sortBy: sortBy as SortType };
    }

    return { page: pageNumber, limit: limitNumber, sortBy: DEFAULT_SORT_BY };
};
