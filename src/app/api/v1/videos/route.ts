import { NextRequest, NextResponse } from "next/server";

import { prismaDB } from "@/db/prisma";
import { getVideoBySlug } from "@/data/videos.data";
import { getCurrentUserId } from "@/data/users.data";

import { generateSlug } from "@/utils";
import { writeBufferFile } from "@/utils/write-buffer-file";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "@/utils/cloudinary";
import { MAXIMUM_THUMBNAIL_SIZE, MAXIMUM_VIDEO_SIZE } from "@/constant";

// handle unique slug
async function generateUniqueSlug(title: string) {
    const baseSlug = generateSlug(title);
    let uniqueSlug = baseSlug;
    let counter = 0;

    while (await getVideoBySlug(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${++counter}`;
    }

    return uniqueSlug;
}

export async function GET(request: NextRequest) {
    try {
        // get page number and limit
        const { searchParams } = request.nextUrl;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const sort = searchParams.get("sortBy") || "newest";

        const skip = (page - 1) * limit;

        let orderBy = {};
        if (sort === "oldest") {
            orderBy = {
                createdAt: "asc",
            };
        } else if (sort === "mostViews") {
            orderBy = {
                views: "desc",
            };
        } else if (sort === "mostLikes")
            orderBy = {
                likes: {
                    _count: "desc",
                },
            };
        else if (sort === "newest") {
            orderBy = {
                createdAt: "desc",
            };
        } else orderBy = { createdAt: "desc" };

        // get videos
        const videos = await prismaDB.video.findMany({
            where: { published: true },
            skip,
            take: limit,
            orderBy,
            include: {
                owner: {
                    select: {
                        name: true,
                        username: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(
            { videos, message: "Videos fetched successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// for new video post
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Required form data fields
        const requiredFields = ["title", "description", "category", "tags", "thumbnail", "video"];

        // Check if any required field is missing
        if (requiredFields.some((field) => !formData.get(field))) {
            return NextResponse.json({ error: "Please fill all the fields" }, { status: 404 });
        }

        // Extract form data
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const tags = formData.get("tags") as string;
        const categoryName = formData.get("category") as string;
        const thumbnail = formData.get("thumbnail") as File;
        const video = formData.get("video") as File;
        const isPublished = formData.get("published") === "true";

        // Validate thumbnail and video file sizes
        if (thumbnail.size > MAXIMUM_THUMBNAIL_SIZE) {
            return NextResponse.json(
                { error: "Thumbnail size should be less than 2MB" },
                { status: 400 }
            );
        }

        if (video.size > MAXIMUM_VIDEO_SIZE) {
            return NextResponse.json(
                { error: "Video size should be less than 50MB" },
                { status: 400 }
            );
        }

        // Authenticate user session
        const currentUserId = await getCurrentUserId();
        if (!currentUserId) {
            return NextResponse.json(
                { error: "You must be logged in to upload a video" },
                { status: 401 }
            );
        }

        // Upload thumbnail and video files
        const thumbnailPath = await writeBufferFile(thumbnail);
        const thumbnailData = await uploadImageToCloudinary(
            thumbnailPath,
            "darshan-tube/thumbnails"
        );

        if (!thumbnailData) {
            return NextResponse.json({ error: "Thumbnail upload failed" }, { status: 500 });
        }

        const videoPath = await writeBufferFile(video);
        const videoData = await uploadVideoToCloudinary(videoPath, "darshan-tube/videos");

        if (!videoData) {
            return NextResponse.json({ error: "Video upload failed" }, { status: 500 });
        }

        // Generate a unique slug for the video
        const videoSlug = await generateUniqueSlug(title);

        // Create or find the video category
        const category = await prismaDB.category.upsert({
            where: { name: categoryName },
            create: { name: categoryName },
            update: {},
        });

        // Insert the video record in the database
        const createdVideo = await prismaDB.video.create({
            data: {
                title,
                slug: videoSlug,
                description,
                videoUrl: videoData.secure_url,
                duration: videoData.duration,
                thumbnailUrl: thumbnailData.secure_url,
                ownerId: currentUserId,
                published: isPublished,
                categoryId: category.id,
            },
            select: {
                id: true,
            },
        });

        if (!createdVideo) {
            return NextResponse.json({ error: "Video creation failed" }, { status: 500 });
        }

        // Upsert tags and associate with the video
        const parsedTags = JSON.parse(tags);
        const tagIds = await Promise.all(
            parsedTags &&
                parsedTags.map(async (tag: string) => {
                    const tagRecord = await prismaDB.tag.upsert({
                        where: { name: tag },
                        create: { name: tag },
                        update: {},
                    });

                    return tagRecord.id;
                })
        );

        await prismaDB.tagOnVideo.createMany({
            data: tagIds.map((tagId) => ({
                videoId: createdVideo.id,
                tagId,
            })),
        });

        // Fetch video with tags and category to return in the response
        const videoWithDetails = await prismaDB.video.findUnique({
            where: { id: createdVideo.id },
            include: {
                tags: {
                    select: {
                        tag: {
                            select: { name: true },
                        },
                    },
                },
                category: {
                    select: { name: true },
                },
            },
        });

        const responseVideo = {
            ...videoWithDetails,
            tags: videoWithDetails?.tags.map((t) => t.tag.name),
            category: videoWithDetails?.category?.name,
        };

        return NextResponse.json(
            {
                data: responseVideo,
                message: "New video uploaded successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error uploading video:", error);
        return NextResponse.json(
            { error: "An error occurred while uploading the video" },
            { status: 500 }
        );
    }
}
