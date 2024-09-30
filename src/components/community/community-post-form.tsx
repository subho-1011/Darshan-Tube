"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormError, UserAvatar } from "@/components/common";

import { Camera, Loader2Icon } from "lucide-react";

import { useCommunityPostForm, useCurrentUser } from "@/hooks";

const CommunityPostForm: React.FC = () => {
    const user = useCurrentUser();
    const {
        text,
        setText,
        textareaRef,
        uploadedImage,
        isUploading,
        textError,
        errorMsg,
        handleFormSubmit,
        handleImageChange,
    } = useCommunityPostForm();

    return (
        <div className="relative flex size-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md shadow-2xl">
            <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                    <UserAvatar username={user?.username} src={user?.image} name={user?.name} />
                    <div>
                        <a href="" className="flex items-center font-semibold" target="_blank" rel="noreferrer">
                            {user?.name}
                        </a>
                        <div className="flex space-x-1">
                            <a href="" className="text-sm text-gray-500">
                                @{user?.username}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="break-words leading-normal">
                <form className="flex flex-col space-y-3" onSubmit={handleFormSubmit}>
                    <Textarea
                        ref={textareaRef}
                        name="text"
                        placeholder="Write a post..."
                        className={`text-sm min-h-8 h-10 ${textError ? "border-red-500 focus:ring-red-500" : ""} ${
                            !text ? "" : "h-40"
                        } `}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isUploading}
                    />

                    {uploadedImage && (
                        <div className="flex items-center justify-center">
                            <Image
                                src={uploadedImage ? URL.createObjectURL(uploadedImage) : ""}
                                alt={uploadedImage.name}
                                className="w-full aspect-video rounded-xl border object-cover"
                                width={400}
                                height={400}
                            />
                        </div>
                    )}
                    <FormError message={errorMsg} />

                    <div className={cn("flex justify-end gap-3", !text ? "hidden" : "")}>
                        <Input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={isUploading}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("image-input")?.click();
                            }}
                            disabled={isUploading}
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommunityPostForm;
