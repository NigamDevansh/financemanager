import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { DashboardProps } from "../types";

const Dashboard = ({ children, activeMenu }: DashboardProps) => {
    const { user } = useContext(AppContext);
    return (
        <div>
            <Menubar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
