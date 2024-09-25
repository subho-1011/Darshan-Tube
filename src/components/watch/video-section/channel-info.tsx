import Link from "next/link";
import { TOwnerWithSubscribers } from "@/types";
import { UserAvatar } from "@/components/common";
import SubscribeButton from "../video-actions/subscribed-button";

export const ChannelInfo: React.FC<{
    isSubscribed: boolean;
    owner: TOwnerWithSubscribers;
}> = ({ isSubscribed, owner }) => {
    return (
        <section id="channel" className="flex items-center gap-4">
            <UserAvatar
                name={owner.name}
                username={owner.username}
                src={owner.image}
            />
            <Link href={`/@${owner.username}`}>
                <h2 className="font-semibold">{owner.name}</h2>
                <p className="text-sm text-gray-500">
                    {owner.subscribers} subscribers
                </p>
            </Link>
            <SubscribeButton channelId={owner.id} isSubscribed={isSubscribed} />
        </section>
    );
};
