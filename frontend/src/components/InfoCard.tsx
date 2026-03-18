import type { InfoCardProps } from "../types";
import { Card, CardContent } from "./ui/card";

const InfoCard = ({ icon, label, value, color }: InfoCardProps) => {
    return (
        <Card className="hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 dark:bg-black/40 backdrop-blur-xl relative overflow-hidden group">
            {/* Ambient inner glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <CardContent className="flex items-center gap-6 p-6 relative z-10">
                <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {icon}
                </div>
                <div>
                    <h6 className="text-sm font-medium text-muted-foreground mb-1 tracking-wide">{label}</h6>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 drop-shadow-sm">&#8377;{value}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default InfoCard;
