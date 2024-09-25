import { getCurrentUserId } from "@/data/users.data";
import { prismaDB } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { channelId: string } }) {
    try {
        const { channelId } = params;
        if (!channelId) {
            return NextResponse.json({ message: "Channel id is required" }, { status: 400 });
        }

        const userId = await getCurrentUserId();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const existingSubscription = await prismaDB.subscription.findUnique({
            where: {
                userId_channelId: {
                    userId,
                    channelId,
                },
            },
        });

        if (existingSubscription) {
            await prismaDB.subscription.delete({
                where: { id: existingSubscription.id },
            });

            return NextResponse.json({ message: "Unsubscribed successfully" }, { status: 200 });
        }

        await prismaDB.subscription.create({
            data: {
                userId,
                channelId,
            },
        });

        return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
