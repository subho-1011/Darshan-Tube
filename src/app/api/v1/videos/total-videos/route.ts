import { prismaDB } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const totalVideos = await prismaDB.video.count({
            where: { published: true },
        });

        return NextResponse.json(
            { totalVideos, message: "Total videos fetched successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
