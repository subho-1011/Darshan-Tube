import { prismaDB } from "@/db/prisma";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/data/users.data";
import { writeBufferFile } from "@/utils/write-buffer-file";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { createErrorResponse, createSuccessResponse, getPaginationParams } from "@/utils";

export async function GET(req: NextRequest) {
    try {
        const { page, limit: perPage } = getPaginationParams(req);

        const communityPosts = await prismaDB.communityPost.findMany({
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
                owner: {
                    select: { id: true, name: true, username: true, image: true },
                },
                communityPostLike: {
                    select: { ownerId: true },
                },
            },
        });

        const currentUserId = await getCurrentUserId();

        return createSuccessResponse(
            communityPosts.map((post) => ({
                ...post,
                isLiked: post.communityPostLike?.some((like) => like.ownerId === currentUserId),
                likes: post.communityPostLike?.length || 0,
                isOwner: post.ownerId === currentUserId,
            })),
            "Community Posts Fetched Successfully"
        );
    } catch (error) {
        return createErrorResponse("Failed to fetch community posts", 500, error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const ownerId = await getCurrentUserId();
        if (!ownerId) {
            return createErrorResponse("User not authenticated :: Community", 401);
        }

        const formdata = await req.formData();
        const text = formdata.get("text") as string;
        const image = formdata.get("image") as File;
        if (!text) {
            return createErrorResponse("Text is required :: Community", 400);
        }

        // if image then upload image
        if (image) {
            if (image.size > 1024 * 1024 * 2) {
                return createErrorResponse("Image size should be less than 2MB :: Community", 400);
            }
            const imagePath = await writeBufferFile(image);
            const uploadImageData = await uploadImageToCloudinary(imagePath, "darshan-tube/communityPosts");

            if (!uploadImageData) {
                return createErrorResponse("Failed to upload image :: Community", 500);
            }
            const images: string[] = [];
            images.push(uploadImageData.url);
            const post = await prismaDB.communityPost.create({
                data: {
                    text,
                    images,
                    ownerId,
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                        },
                    },
                },
            });

            return createSuccessResponse(
                {
                    ...post,
                    isLiked: false,
                    likes: 0,
                    isOwner: true,
                },
                "Post created successfully :: Community",
                201
            );
        }

        // else create post without image
        const newPost = await prismaDB.communityPost.create({
            data: {
                text,
                ownerId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                    },
                },
            },
        });

        return createSuccessResponse(
            {
                ...newPost,
                images: [],
                isLiked: false,
                likes: 0,
                isOwner: true,
            },
            "Post created successfully :: Community",
            201
        );
    } catch (error) {
        return createErrorResponse("Failed to fetch community posts", 500, error);
    }
}
