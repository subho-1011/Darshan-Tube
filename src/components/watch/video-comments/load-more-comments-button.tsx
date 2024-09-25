import { Button } from "@/components/ui/button";
import { useVideoCommentsActions, useVideoCommentsState } from "@/hooks/watch";
import { Loader2Icon } from "lucide-react";

const LoadMoreCommentsButton = () => {
    const { isLoadMoreComments } = useVideoCommentsState();
    const { haveMoreComments, handleLoadMoreComments } = useVideoCommentsActions();

    return (
        <>
            {isLoadMoreComments && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {haveMoreComments() && (
                <>
                    <Button
                        variant="link"
                        className="w-full justify-start my-4 hover:text-blue-500 text-blue-400 font-normal"
                        text="Load more..."
                        onClick={handleLoadMoreComments}
                    />
                </>
            )}
        </>
    );
};

export default LoadMoreCommentsButton;
