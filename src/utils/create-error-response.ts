import { NextResponse } from "next/server";

export function createErrorResponse(message: string, status: number, error?: unknown) {
    if (error instanceof Error) {
        return NextResponse.json(
            {
                error: error.message,
                message,
            },
            { status }
        );
    }

    return NextResponse.json(
        {
            message,
        },
        { status }
    );
}
