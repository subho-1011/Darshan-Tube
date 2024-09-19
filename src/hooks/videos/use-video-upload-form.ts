"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { VideoUploadFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { uploadANewVideo } from "@/services/videos.services";
import { MAXIMUM_THUMBNAIL_SIZE, MAXIMUM_VIDEO_SIZE } from "@/constant";

export const useVideoUploadForm = () => {
    const router = useRouter();
    const { channelId } = useParams();

    const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const form = useForm<z.infer<typeof VideoUploadFormSchema>>({
        resolver: zodResolver(VideoUploadFormSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: [],
            category: "Entertainment",
            video: undefined,
            thumbnail: undefined,
            published: true,
        },
    });

    console.log(form.watch("tags"));

    const mutation = useMutation({
        mutationFn: uploadANewVideo,
        onSuccess: () => {
            setSuccessMessage("Video uploaded successfully!");
            resetVideoFile();
            resetThumbnailFile();
            form.reset();

            setTimeout(() => {
                router.push(`/channels/${channelId}`);
            }, 1000);
        },
        onError: (error: Error) => {
            let message = "Failed to upload video. Please try again.";

            if (error instanceof AxiosError) {
                message = error.response?.data?.error || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            setErrorMessage(message);
        },
    });

    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetVideoFile = () => {
        setSelectedVideoFile(null);
        setVideoPreviewUrl(null);
    };

    const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedThumbnailFile(file);
            setThumbnailPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetThumbnailFile = () => {
        setSelectedThumbnailFile(null);
        setThumbnailPreviewUrl(null);
    };

    const handleSubmit = (formData: z.infer<typeof VideoUploadFormSchema>) => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!selectedVideoFile) {
            setErrorMessage("Please select a video file.");
            return;
        }

        if (selectedVideoFile.size > MAXIMUM_VIDEO_SIZE) {
            setErrorMessage("Video size should be less than 50MB");
            return;
        }

        if (!selectedThumbnailFile) {
            setErrorMessage("Please select a thumbnail file.");
            return;
        }

        if (selectedThumbnailFile.size > MAXIMUM_THUMBNAIL_SIZE) {
            setErrorMessage("Thumbnail size should be less than 2MB");
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append("title", formData.title);
        uploadFormData.append("description", formData.description);
        uploadFormData.append("tags", JSON.stringify(formData.tags));
        uploadFormData.append("category", formData.category);
        uploadFormData.append("published", formData.published.toString());
        uploadFormData.append("video", selectedVideoFile);
        uploadFormData.append("thumbnail", selectedThumbnailFile);

        // const uploadData = { ...formData };
        // Execute mutation to upload video
        mutation.mutate(uploadFormData);
    };

    return {
        selectedVideoFile,
        videoPreviewUrl,
        handleVideoFileChange,
        resetVideoFile,
        selectedThumbnailFile,
        thumbnailPreviewUrl,
        handleThumbnailFileChange,
        resetThumbnailFile,
        form,
        handleSubmit,
        isSubmitting: mutation.isPending,
        errorMessage,
        successMessage,
    };
};
