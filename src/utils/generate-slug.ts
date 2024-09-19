export const generateSlug = (title: string) => {
    const slug = title
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading and trailing spaces
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters (except spaces and hyphens)
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-+/, "") // Remove leading hyphen
        .replace(/-+$/, "");

    return slug;
};
