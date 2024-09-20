import { useState } from "react";

export const useVideosSortings = () => {
    const [sort, setSort] = useState<string>("");

    const selectSortBy = (sort: string) => setSort(sort);

    return { sort, selectSortBy };
};
