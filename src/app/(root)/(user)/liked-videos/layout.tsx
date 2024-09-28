import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liked Videos",
    description: "Liked Videos Page of user",
};

export default function LikedVideosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
