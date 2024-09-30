"use client";

import { useRef, useState } from "react";
import { useCurrentUser } from "@/hooks";
import { postNewCommunityPost } from "@/services/community.services";

const useCommunityPostForm = () => {
    const user = useCurrentUser();

    const [text, setText] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>();
    const [isUploading, setIsUploading] = useState(false);
    const [textError, setTextError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg("");
        setUploadedImage(null);

        const files = e.target.files;
        if (!files) return;

        if (files && files[0]) {
            setUploadedImage(files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsUploading(true);
        setErrorMsg("");
        setTextError(false);

        if (!user) {
            setErrorMsg("Please login to post");
            return;
        }

        if (!text) {
            setTextError(true);
            setErrorMsg("Please write something to post");
            return;
        }

        if (text.length > 280) {
            setTextError(true);
            setErrorMsg("Please write something less than 280 characters");
            return;
        }

        const formData = new FormData();
        formData.append("text", text);

        if (uploadedImage) {
            formData.append("image", uploadedImage);
        }

        postNewCommunityPost(formData)
            .then((data) => {
                if (data) {
                    setText("");
                    setUploadedImage(null);
                    console.log(data.data);
                }
            })
            .catch((error) => {
                setErrorMsg(error.message);
            })
            .finally(() => {
                setIsUploading(false);
                textareaRef.current?.focus();
            });
    };

    return {
        text,
        setText,
        textareaRef,
        uploadedImage,
        isUploading,
        textError,
        errorMsg,
        handleFormSubmit,
        handleImageChange,
    };
};

export default useCommunityPostForm;
