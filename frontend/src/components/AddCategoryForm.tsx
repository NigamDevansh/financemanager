import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";
import type { AddCategoryFormProps, CategoryFormData } from "../types";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }: AddCategoryFormProps) => {
    const [category, setCategory] = useState<CategoryFormData>({
        name: "",
        type: "income",
        icon: ""
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory({
                name: initialCategoryData.name,
                type: initialCategoryData.type,
                icon: initialCategoryData.icon,
            });
        } else {
            setCategory({ name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ]

    const handleChange = (key: string, value: string) => {
        setCategory({ ...category, [key]: value })
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-4">

            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", (target as HTMLInputElement).value)}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", (target as HTMLSelectElement).value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="add-btn add-btn-fill">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>

    )
}

export default AddCategoryForm;
