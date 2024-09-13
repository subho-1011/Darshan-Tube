import bcrypt from "bcryptjs";

import { RegisterFormSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "@/db/prisma";

export async function POST(req: NextRequest) {
    const resBody = await req.json();
    const validateData = RegisterFormSchema.safeParse(resBody);
    if (!validateData.success) {
        return NextResponse.json(
            { error: validateData.error },
            { status: 400 }
        );
    }

    const { email, password, name, username } = validateData.data;

    const isUniqueUsername = await prismaDB.user.findUnique({
        where: { username },
    });

    if (isUniqueUsername) {
        return NextResponse.json(
            { error: "Username is already taken" },
            { status: 400 }
        );
    }

    const isUniqueEmail = await prismaDB.user.findUnique({
        where: { email },
    });
    if (isUniqueEmail) {
        return NextResponse.json(
            { error: "Email is already taken" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prismaDB.user.create({
        data: {
            email,
            name,
            username,
            password: hashedPassword,
        },
    });

    if (!data) {
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { data, message: "User registered successfully" },
        { status: 201 }
    );
}
