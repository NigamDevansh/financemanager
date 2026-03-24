import { useState } from "react";
import Input from "./Input";
import { Button } from "./ui/button";

interface ExportModalProps {
    onExport: (year: number, month: number) => void;
    loading?: boolean;
}

const ExportModal = ({ onExport, loading }: ExportModalProps) => {
    const today = new Date();
    const [year, setYear] = useState<string>(today.getFullYear().toString());
    const [month, setMonth] = useState<string>((today.getMonth() + 1).toString());

    const monthOptions = [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    const currentYear = today.getFullYear();
    const yearOptions = Array.from({ length: 11 }, (_, i) => {
        const y = currentYear - 5 + i; // 5 years back to 5 years forward
        return { label: y.toString(), value: y.toString() };
    });

    return (
        <div className="p-4">
            <p className="text-sm text-foreground/70 mb-4">
                Select the month and year for the report. By default, the current month is selected.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Month"
                    value={month}
                    onChange={({ target }) => setMonth((target as HTMLSelectElement).value)}
                    isSelect={true}
                    options={monthOptions}
                />
                <Input
                    label="Year"
                    value={year}
                    onChange={({ target }) => setYear((target as HTMLSelectElement).value)}
                    isSelect={true}
                    options={yearOptions}
                />
            </div>
            <div className="flex justify-end mt-6">
                <Button onClick={() => onExport(Number(year), Number(month))} disabled={loading} className="flex items-center gap-2">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                            Processing...
                        </div>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ExportModal;
