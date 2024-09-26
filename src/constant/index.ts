export const MAXIMUM_THUMBNAIL_SIZE =
    1024 * 1024 * parseInt(process.env.MAXIMUM_THUMBNAIL_SIZE!);

export const MAXIMUM_VIDEO_SIZE =
    1024 * 1024 * parseInt(process.env.MAXIMUM_VIDEO_SIZE!);

export const SortByOptions = [
    {
        type: "newest",
        displayName: "sort by newest",
    },
    {
        type: "oldest",
        displayName: "sort by oldest",
    },
    {
        type: "mostViews",
        displayName: "sort by most views",
    },
    {
        type: "mostLikes",
        displayName: "sort by most likes",
    },
] as const;
