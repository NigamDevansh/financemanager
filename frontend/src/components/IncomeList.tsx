import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";
import type { IncomeListProps } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }: IncomeListProps) => {
    const [loading, setLoading] = useState(false);
    
    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        } finally {
            setLoading(false);
        }
    }
    
    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
                <CardTitle className="text-lg font-medium">Income Sources</CardTitle>
                <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" disabled={loading} onClick={handleEmail} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        {loading ? (
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                            <Mail size={15} />
                        )}
                        <span className="hidden sm:inline">{loading ? 'Emailing...' : 'Email'}</span>
                    </Button>
                    <Button variant="outline" size="sm" disabled={loading} onClick={handleDownload} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        {loading ? (
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download size={15} />
                        )}
                        <span className="hidden sm:inline">{loading ? 'Downloading...' : 'Download'}</span>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions?.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default IncomeList;
