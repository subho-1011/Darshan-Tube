// delete video comment

import { NextRequest, NextResponse } from "next/server";

import { prismaDB } from "@/db/prisma";

import { getCurrentUserId } from "@/data/users.data";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { slug: string; commentId: string } }
) {
    try {
        const { slug, commentId } = params;

        // validate slug
        if (!slug) {
            return NextResponse.json({ message: "Video slug not found" }, { status: 400 });
        }

        // find video by slug
        const video = await prismaDB.video.findUnique({ where: { slug } });
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        const userId = await getCurrentUserId();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        // update comment
        const body = await request.json();
        if (!body.text) {
            return NextResponse.json({ message: "Text is required" }, { status: 400 });
        }

        const comment = await prismaDB.videoComment.findUnique({ where: { id: commentId } });
        if (!comment) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }

        if (comment.ownerId !== userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const updatedComment = await prismaDB.videoComment.update({
            where: { id: commentId },
            data: { text: body.text },
        });

        return NextResponse.json(
            {
                comment: updatedComment,
                message: "Comment updated successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string; commentId: string } }
) {
    try {
        const { slug, commentId } = params;

        // validate slug
        if (!slug) {
            return NextResponse.json({ message: "Video slug not found" }, { status: 400 });
        }

        // find video by slug
        const video = await prismaDB.video.findUnique({ where: { slug } });
        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        const userId = await getCurrentUserId();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        // delete comment
        const comment = await prismaDB.videoComment.findUnique({ where: { id: commentId } });
        if (!comment) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }

        if (comment.ownerId !== userId) {
            return NextResponse.json(
                { message: "Unauthorized to delete this comment" },
                { status: 401 }
            );
        }

        await prismaDB.videoComment.delete({ where: { id: commentId } });

        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
