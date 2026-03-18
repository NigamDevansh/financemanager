import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import type { TransactionsProps } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const Transactions = ({ transactions, onMore, type, title }: TransactionsProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <Button variant="outline" size="sm" onClick={onMore} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    More <ArrowRight size={15} />
                </Button>
            </CardHeader>

            <CardContent>
                <div className="mt-2 flex flex-col gap-2">
                    {transactions?.slice(0, 5)?.map(item => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Transactions;
