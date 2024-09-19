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
