import { NextResponse } from "next/server";

export function createSuccessResponseWithData<T>(data: T, message: string, status: number = 200) {
    return NextResponse.json(
        {
            data,
            message,
        },
        { status }
    );
}
