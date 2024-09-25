"use server";

import { prismaDB } from "@/db/prisma";

export const getVideoBySlug = async (slug: string) => {
    try {
        const video = await prismaDB.video.findUnique({
            where: { slug },
        });

        return video ? video : null;
    } catch (error) {
        return null;
    }
};

export const getVideoById = async (id: string) => {
    try {
        const video = await prismaDB.video.findUnique({
            where: { id },
        });

        return video ? video : null;
    } catch (error) {
        return null;
    }
};

export const updateVideoViews = async (id: string) => {
    try {
        await prismaDB.video.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    } catch (error: any) {
        console.error(error.message);
    }
};
