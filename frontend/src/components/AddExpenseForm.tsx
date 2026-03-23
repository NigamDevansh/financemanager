import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import type { AddExpenseFormProps, ExpenseFormData } from "../types";
import { Button } from "./ui/button";

const AddExpenseForm = ({ onAddExpense, categories }: AddExpenseFormProps) => {
    const [expense, setExpense] = useState<ExpenseFormData>({
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: "",
    });
    const [loading, setLoading] = useState(false);

    // Effect to set a default category if categories are loaded and none is selected
    useEffect(() => {
        if (categories && categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: String(categories[0].id) }));
        }
    }, [categories, expense.categoryId]);

    const handleChange = (key: string, value: string) => setExpense({ ...expense, [key]: value });

    // Map categories to the format expected by the reusable Input dropdown
    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: `${cat.name}`,
    }));

    const handleAddExpenseClick = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", (target as HTMLInputElement).value)}
                label="Expense Source"
                placeholder="e.g., Electricity, Wifi"
                type="text"
            />

            {/* Replaced Input for 'Category' text with a dropdown for 'Category' */}
            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", (target as HTMLSelectElement).value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", (target as HTMLInputElement).value)}
                label="Amount"
                placeholder="e.g., 150.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", (target as HTMLInputElement).value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <Button
                    type="button"
                    className="flex items-center gap-2"
                    onClick={handleAddExpenseClick}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                            Adding...
                        </div>
                    ) : (
                        "Add Expense"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
