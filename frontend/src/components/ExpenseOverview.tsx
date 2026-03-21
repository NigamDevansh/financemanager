import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart";
import { prepareIncomeLineChartData } from "../util/util";
import type { ExpenseOverviewProps, ChartDataPoint } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

const ExpenseOverview = ({ transactions, onExpenseIncome }: ExpenseOverviewProps) => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 sm:pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">Expense Overview</CardTitle>
                    <CardDescription className="text-xs">
                        Track your spending trends over time and gain insights into where your money goes.
                    </CardDescription>
                </div>

                <Button onClick={onExpenseIncome} className="flex items-center gap-1.5" variant="destructive">
                    <Plus size={15} /> Add Expense
                </Button>
            </CardHeader>
            <CardContent>
                <div className="w-full mt-4">
                    <CustomLineChart data={chartData} />
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpenseOverview;
