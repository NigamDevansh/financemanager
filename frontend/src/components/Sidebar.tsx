import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import type { SidebarProps } from "../types";
import { Button } from "./ui/button";

const Sidebar = ({ activeMenu }: SidebarProps) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg rounded-3xl mt-6 p-5 sticky top-[80px] z-20 overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-8">
                {user?.profileImageUrl ? (
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <img src={user?.profileImageUrl || ""} alt="profile image" className="relative w-24 h-24 object-cover border-4 border-white/60 dark:border-white/10 rounded-full shadow-lg" />
                    </div>
                ) : (
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative w-24 h-24 bg-white/60 dark:bg-muted/50 rounded-full flex items-center justify-center border-4 border-white/60 dark:border-white/10 shadow-lg">
                            <User className="w-10 h-10 text-muted-foreground" />
                        </div>
                    </div>
                )}
                <h5 className="text-foreground font-semibold text-lg tracking-tight leading-6">{user?.fullName || ""}</h5>
            </div>
            <div className="flex flex-col gap-3">
                {SIDE_BAR_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <Button
                            onClick={() => navigate(item.path)}
                            key={`menu_${index}`}
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start gap-4 text-[15px] font-medium py-6 px-6 transition-all duration-300 ${
                                isActive 
                                    ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md shadow-purple-500/20 rounded-xl hover:shadow-lg hover:from-violet-600 hover:to-purple-600 border-none scale-105" 
                                    : "text-muted-foreground hover:bg-white/50 dark:hover:bg-white/5 hover:text-foreground rounded-xl hover:scale-105"
                            }`}
                        >
                            <item.icon className="text-[20px]" strokeWidth={isActive ? 2.5 : 2} />
                            {item.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    )
}

export default Sidebar;
