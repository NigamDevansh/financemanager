import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { DashboardProps } from "../types";

const Dashboard = ({ children, activeMenu }: DashboardProps) => {
    const { user } = useContext(AppContext);
    return (
        <div className="min-h-screen bg-slate-50/50 text-foreground font-sans relative overflow-hidden transition-colors duration-500 dark:bg-background">
            {/* Ambient Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/20 blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-purple-900/20" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-300/20 blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-pink-900/20" />
            <div className="fixed top-[20%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-blue-900/20" />

            <Menubar activeMenu={activeMenu} />

            {user && (
                <div className="flex relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-[1080px]:hidden">
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5 mt-6 mb-16">{children}</div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
