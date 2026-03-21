import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandsSeparator } from "../util/util";
import type { TransactionInfoCardProps } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }: TransactionInfoCardProps) => {
    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-foreground bg-accent/50 rounded-full border border-border/50">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6 object-contain" />
                ) : (
                    <UtensilsCrossed className="text-muted-foreground" />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-foreground font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-3">
                    {!hideDeleteBtn && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onDelete}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity h-8 w-8">
                            <Trash2 size={16} />
                        </Button>
                    )}

                    <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1.5 px-2.5 py-1 ${
                            type === 'income' 
                                ? 'bg-income/30 text-emerald-700 border-income hover:bg-income/40 dark:text-emerald-400' 
                                : 'bg-expense/30 text-rose-700 border-expense hover:bg-expense/40 dark:text-rose-400'
                        }`}
                    >
                        <h6 className="text-xs font-semibold">
                            {type === 'income' ? '+' : '-'} &#8377;{addThousandsSeparator(amount)}
                        </h6>
                        {type === 'income' ? (
                            <TrendingUp size={14} />
                        ) : (
                            <TrendingDown size={14} />
                        )}
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard;
