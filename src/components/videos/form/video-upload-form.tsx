"use client";

import React from "react";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormError, FormSuccess, TagsInput } from "@/components/common";

import { Upload, X } from "lucide-react";
import { TbLoader2 } from "react-icons/tb";

import { VideoCategory } from "@/schemas";
import { useVideoUploadForm } from "@/hooks/videos";

export const VideoUploadForm: React.FC = () => {
    const {
        videoPreviewUrl,
        handleVideoFileChange,
        resetVideoFile,
        thumbnailPreviewUrl,
        handleThumbnailFileChange,
        resetThumbnailFile,
        form,
        handleSubmit,
        isSubmitting,
        errorMessage,
        successMessage,
    } = useVideoUploadForm();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8 max-w-3xl w-full my-6 mx-4"
            >
                <FormField
                    control={form.control}
                    name="video"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                                {videoPreviewUrl ? (
                                    <div className="relative">
                                        <video
                                            src={videoPreviewUrl}
                                            className="aspect-video rounded-xl"
                                            controls
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={resetVideoFile}
                                            disabled={isSubmitting}
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex aspect-video items-center space-x-2 justify-center rounded-xl border border-dashed">
                                        <Input
                                            id="video-upload"
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                handleVideoFileChange(e);
                                                field.onChange(e.target.value);
                                            }}
                                            className="hidden cursor-pointer"
                                            disabled={isSubmitting}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "video-upload"
                                                    )
                                                    ?.click()
                                            }
                                            disabled={isSubmitting}
                                        >
                                            <>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Select Video
                                            </>
                                        </Button>
                                    </div>
                                )}
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="title"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="h-64"
                                    placeholder="description"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <TagsInput
                                    initialTags={field.value || []}
                                    onTagsChange={(tags) =>
                                        field.onChange(tags)
                                    }
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) =>
                                        field.onChange({ target: { value } })
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {VideoCategory.map((category, i) => (
                                            <SelectItem
                                                key={i}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumnail</FormLabel>
                            <FormControl>
                                {thumbnailPreviewUrl ? (
                                    <div className="relative">
                                        <Image
                                            src={thumbnailPreviewUrl}
                                            width={400}
                                            height={225}
                                            alt="local-thumbnail"
                                            className="aspect-video w-full rounded-xl"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={resetThumbnailFile}
                                            disabled={isSubmitting}
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex aspect-video items-center space-x-2 justify-center rounded-xl border border-dashed">
                                        <Input
                                            id="thumbnail-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                handleThumbnailFileChange(e);
                                            }}
                                            className="hidden"
                                            disabled={isSubmitting}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "thumbnail-upload"
                                                    )
                                                    ?.click()
                                            }
                                            disabled={isSubmitting}
                                        >
                                            <>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Select Thumbnail
                                            </>
                                        </Button>
                                    </div>
                                )}
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Published
                                </FormLabel>
                                <FormDescription>
                                    Everyone can see your video
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormError message={errorMessage} />
                <FormSuccess message={successMessage} />
                <Button type="submit" size="lg">
                    {isSubmitting && (
                        <TbLoader2 className="mr-3 h-5 w-5 animate-spin" />
                    )}
                    Submit
                </Button>
            </form>
        </Form>
    );
};
