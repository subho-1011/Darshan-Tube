import { NextResponse } from "next/server";

/**
 * Handles API errors by returning a 500 response with an error message.
 * @param error The error to handle.
 * @returns A NextResponse with a 500 status code and an error message.
 */
export const handleApiError = (error: unknown): NextResponse => {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (error !== null && typeof error === "object") {
        errorMessage = `Error: ${JSON.stringify(error)}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
};
