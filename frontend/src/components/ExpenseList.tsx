import moment from "moment";
import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import type { ExpenseListProps } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }: ExpenseListProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-medium">All Expenses</CardTitle>
                <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={onEmail} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Mail size={15} /> Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDownload} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Download size={15} /> Download
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions?.map((expense) => (
                        <TransactionInfoCard
                            key={expense.id}
                            title={expense.name}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense.id)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpenseList;
