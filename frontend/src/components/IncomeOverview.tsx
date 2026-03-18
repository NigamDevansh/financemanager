import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";
import type { IncomeOverviewProps, ChartDataPoint } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => { };
    }, [transactions]);
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">Income Overview</CardTitle>
                    <CardDescription className="text-xs">
                        Track your earnings over time and analyze your income trends.
                    </CardDescription>
                </div>
                <Button onClick={onAddIncome} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus size={15} /> Add Income
                </Button>
            </CardHeader>
            <CardContent>
                <div className="w-full mt-4">
                    <CustomLineChart data={chartData} />
                </div>
            </CardContent>
        </Card>
    )
}

export default IncomeOverview;
