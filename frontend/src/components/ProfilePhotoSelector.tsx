import { useRef, useState } from "react";
import { Trash, Upload, User } from "lucide-react";
import type { ProfilePhotoSelectorProps } from "../types";

const ProfilePhotoSelector = ({ image, setImage }: ProfilePhotoSelectorProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User className="text-purple-500" size={35} />

                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1">
                        <Upload size={15} className="text-purple-500" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewUrl || ""} alt="profile photo" className="w-20 h-20 rounded-full object-cover" />
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1">
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;
