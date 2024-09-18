import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json(
            { error: "User is not authenticated" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { data: session.user, message: "User data fetch successfully" },
        { status: 200 }
    );
}
