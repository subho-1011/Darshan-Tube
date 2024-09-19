import * as z from "zod";

export const VideoCategoryEnum = z.enum([
    "Entertainment",
    "Music",
    "Gaming",
    "Howto & Style",
    "Comedy",
    "Education",
    "Vlogs",
    "Fitness & Health",
    "Technology & Gadgets",
    "Food & Cooking",
    "Travel",
]);

export const VideoCategory = VideoCategoryEnum.options;

export const VideoUploadFormSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "Title is required",
        })
        .trim(),
    description: z
        .string()
        .min(1, {
            message: "Description is required",
        })
        .trim(),
    category: VideoCategoryEnum, // Assuming this is a valid enum
    tags: z.array(z.string()),
    video: z.any().refine((files) => !!files && files.length > 0, {
        message: `Video is required`,
    }),
    thumbnail: z.any().refine((files) => !!files && files.length > 0, {
        message: `Thumbnail is required`,
    }),
    published: z.boolean().default(false),
});
