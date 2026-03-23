import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";
import type { AddIncomeFormProps, IncomeFormData } from "../types";
import { Button } from "./ui/button";

const AddIncomeForm = ({ onAddIncome, categories }: AddIncomeFormProps) => {
    const [income, setIncome] = useState<IncomeFormData>({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key: string, value: string) => {
        setIncome({ ...income, [key]: value });
    }

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: String(categories[0].id) }))
        }
    }, [categories, income.categoryId]);

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.name}
                onChange={({ target }) => handleChange('name', (target as HTMLInputElement).value)}
                label="Income Source"
                placeholder="e.g., Salary, Freelance, Bonus"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({ target }) => handleChange('categoryId', (target as HTMLSelectElement).value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', (target as HTMLInputElement).value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', (target as HTMLInputElement).value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <Button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="flex items-center gap-2">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                            Adding...
                        </div>
                    ) : (
                        "Add Income"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default AddIncomeForm;
