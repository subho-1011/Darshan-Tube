"use client";

import React from "react";
import Link from "next/link";
import { TVideoWithUser } from "@/types";

export const VideoDescription: React.FC<{
    video: TVideoWithUser;
}> = ({ video }) => {
    return (
        <section
            id="description"
            className="bg-secondary p-4 rounded-xl mb-4 space-y-4"
        >
            <p className="font-semibold mb-2">
                {video?.views} views •{" "}
                {video?.createdAt.toLocaleString().substring(0, 10)}
            </p>
            <strong>{video?.title}</strong>
            <p>{video?.description}</p>
            <p className="flex flex-wrap gap-2">
                {video?.tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/#${tag}`}
                        className="inline-block w-fit bg-gray-200 rounded-full hover:text-blue-500 hover:underline px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                        #{tag}
                    </Link>
                ))}
            </p>
        </section>
    );
};
