import CustomPieChart from "./CustomPieChart";
import { addThousandsSeparator } from "../util/util";
import type { FinanceOverviewProps } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }: FinanceOverviewProps) => {
    // Pastel colors for the pie chart
    const COLORS = ["hsl(262, 60%, 75%)", "hsl(0, 60%, 72%)", "hsl(150, 40%, 55%)"];

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];
    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Financial Overview</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="mt-2 text-foreground">
                    <CustomPieChart
                        data={balanceData}
                        label="Total Balance"
                        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                        colors={COLORS}
                        showTextAnchor
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default FinanceOverview;
