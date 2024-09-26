import { NextResponse } from "next/server";

export function createSuccessMessage(message: string, status: number = 200) {
    return NextResponse.json(
        {
            message,
        },
        { status }
    );
}
