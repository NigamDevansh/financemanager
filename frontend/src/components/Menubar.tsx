import { useContext } from "react";
import { User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import type { MenubarProps } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "./ui/sheet";

const Menubar = ({ activeMenu }: MenubarProps) => {
    const { clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between gap-5 bg-background/80 border-b border-border backdrop-blur-md py-4 px-4 sm:px-7 sticky top-0 z-30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
            {/* Left side - Menu button and title */}
            <div className="flex items-center gap-5">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="block lg:hidden text-foreground hover:bg-accent p-1 rounded transition-colors">
                            <Menu className="text-2xl" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 pt-10 w-64 border-r-0">
                        <Sidebar activeMenu={activeMenu} />
                    </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-10 w-10" />
                    <span className="hidden sm:inline text-lg font-medium text-foreground truncate">Finance Manager App</span>
                </div>
            </div>

            {/* Right side - Avatar dropdown */}
            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar className="h-10 w-10 border border-border shadow-sm hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all">
                            <AvatarImage src={user?.profileImageUrl || ""} alt={user?.fullName || "User"} />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                                <User className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-1">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none truncate">{user?.fullName}</p>
                                <p className="text-xs leading-none text-muted-foreground truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Menubar;
