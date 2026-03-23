import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";
import { Skeleton } from "../components/ui/skeleton";
import type { DashboardData } from "../types";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error('Something went wrong while fetching dashboard data:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, []);

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Display the cards*/}
                        {loading || !dashboardData ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="bg-card p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                                    </div>
                                    <div className="space-y-2 mt-2 w-full">
                                        <Skeleton className="h-4 w-1/2 rounded-md min-w-[80px]" />
                                        <Skeleton className="h-8 w-3/4 rounded-md min-w-[120px]" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <InfoCard
                                    icon={<WalletCards />}
                                    label="Total Balance"
                                    value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                                    color="bg-gradient-to-br from-violet-400 to-indigo-600 shadow-indigo-500/40"
                                />
                                <InfoCard
                                    icon={<Wallet />}
                                    label="Total Income"
                                    value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                                    color="bg-gradient-to-br from-emerald-400 to-teal-600 shadow-teal-500/40"
                                />
                                <InfoCard
                                    icon={<Coins />}
                                    label="Total Expense"
                                    value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                                    color="bg-gradient-to-br from-rose-400 to-pink-600 shadow-pink-500/40"
                                />
                            </>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading || !dashboardData ? (
                            <>
                                {/* Chart Skeleton */}
                                <div className="md:col-span-2 lg:col-span-1 bg-card p-4 sm:p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col h-[350px]">
                                    <div className="space-y-2 mb-8 w-full">
                                        <Skeleton className="h-5 w-1/3 rounded-md min-w-[120px]" />
                                        <Skeleton className="h-3 w-1/2 rounded-md min-w-[180px]" />
                                    </div>
                                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-3 px-1 sm:px-2">
                                        {Array(8).fill(0).map((_, i) => (
                                            <Skeleton key={i} className="w-full rounded-t-md" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                        ))}
                                    </div>
                                </div>

                                {/* Chart Skeleton */}
                                <div className="md:col-span-2 lg:col-span-1 bg-card p-4 sm:p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col h-[350px]">
                                    <div className="space-y-2 mb-8 w-full">
                                        <Skeleton className="h-5 w-1/3 rounded-md min-w-[120px]" />
                                        <Skeleton className="h-3 w-1/2 rounded-md min-w-[180px]" />
                                    </div>
                                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-3 px-1 sm:px-2">
                                        {Array(8).fill(0).map((_, i) => (
                                            <Skeleton key={i} className="w-full rounded-t-md" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                        ))}
                                    </div>
                                </div>

                                {/* List Skeletons */}
                                {[1, 2].map((listIdx) => (
                                    <div key={`list-${listIdx}`} className="bg-card p-4 sm:p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <Skeleton className="h-5 w-1/3 rounded-md min-w-[100px]" />
                                            <Skeleton className="h-4 w-16 rounded-md shrink-0" />
                                        </div>
                                        <div className="space-y-5 w-full">
                                            {Array(4).fill(0).map((_, i) => (
                                                <div key={i} className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3 w-full">
                                                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                                        <div className="space-y-2 w-full">
                                                            <Skeleton className="h-4 w-1/2 rounded-md min-w-[80px]" />
                                                            <Skeleton className="h-3 w-1/3 rounded-md min-w-[50px]" />
                                                        </div>
                                                    </div>
                                                    <Skeleton className="h-4 w-16 rounded-md shrink-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {/* Recent transactions */}
                                <div className="md:col-span-2 lg:col-span-1">
                                    <RecentTransactions
                                        transactions={dashboardData?.recentTransactions || []}
                                        onMore={() => navigate("/expense")}
                                    />
                                </div>

                                {/* finance overview chart */}
                                <div className="md:col-span-2 lg:col-span-1">
                                    <FinanceOverview
                                        totalBalance={dashboardData?.totalBalance || 0}
                                        totalIncome={dashboardData?.totalIncome || 0}
                                        totalExpense={dashboardData?.totalExpense || 0}
                                    />
                                </div>

                                {/* Expense transactions */}
                                <Transactions
                                    transactions={dashboardData?.recent5Expenses || []}
                                    onMore={() => navigate("/expense")}
                                    type="expense"
                                    title="Recent Expenses"
                                />

                                {/* Income transactions */}
                                <Transactions
                                    transactions={dashboardData?.recent5Incomes || []}
                                    onMore={() => navigate("/income")}
                                    type="income"
                                    title="Recent Incomes"
                                />
                            </>
                        )}
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;
