import { useRouter } from "next/navigation";
import { useState } from "react";

const useCommunityDialog = () => {
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(true);

    const handleDialogOpen = () => {
        router.back();
        setOpenDialog(!openDialog);
    };

    return { openDialog, handleDialogOpen };
};

export default useCommunityDialog;
