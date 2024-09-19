import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

type TagsInputProps = {
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    disabled?: boolean;
};

export const TagsInput: React.FC<TagsInputProps> = ({
    initialTags = [],
    onTagsChange,
    disabled = false,
}) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [inputValue, setInputValue] = useState<string>("");

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // Handle adding new tags
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            setInputValue("");
            onTagsChange?.(newTags);
        }
    };

    // Handle tag removal
    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        onTagsChange?.(newTags);
    };

    return (
        <div className="">
            <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Badge key={index} className="flex items-center w-fit space-x-2">
                        <span>{tag}</span>
                        <button type="button" onClick={() => handleRemoveTag(index)}>
                            &times;
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleAddTag}
                placeholder="Enter a tag and press Enter"
                disabled={disabled}
            />
        </div>
    );
};
