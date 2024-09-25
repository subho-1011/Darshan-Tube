import Link from "next/link";
import { UserAvatar } from "@/components/common";
import SubscribeButton from "../video-actions/subscribed-button";
import { useAppSelector } from "@/lib/utils";

export const ChannelInfo: React.FC = () => {
    const { video } = useAppSelector((state) => state.videoPlayer);

    return (
        <section id="channel" className="flex items-center gap-4">
            <UserAvatar
                name={video?.owner.name}
                username={video?.owner.username}
                src={video?.owner.image}
            />
            <Link href={`/@${video?.owner.username}`}>
                <h2 className="font-semibold">{video?.owner.name}</h2>
                <p className="text-sm text-gray-500">{video?.owner.subscribers} subscribers</p>
            </Link>
            <SubscribeButton />
        </section>
    );
};
