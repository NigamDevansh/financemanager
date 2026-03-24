import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
import { Skeleton } from "../components/ui/skeleton";
import type { Transaction, Category, IncomeFormData, DeleteAlertState } from "../types";
import ExportModal from "../components/ExportModal";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
        show: false,
        data: null,
    });

    type ExportActionType = 'download' | 'email' | null;
    const [exportModalState, setExportModalState] = useState<{ show: boolean, action: ExportActionType }>({
        show: false,
        action: null
    });
    const [exportLoading, setExportLoading] = useState(false);

    // Fetch income details from the API
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error: any) {
            console.error('Failed to fetch income details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    // Fetch categories for income
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error: any) {
            console.log('Failed to fetch income categories:', error);
            toast.error(error.data?.message || "Failed to fetch income categories");
        }
    }

    //save the income details
    const handleAddIncome = async (income: IncomeFormData) => {
        const { name, amount, date, icon, categoryId } = income;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error('Date cannot be in the future');
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error: any) {
            console.log('Error adding income', error);
            toast.error(error.response?.data?.message || "Failed to adding income");
        }
    }

    //delete income details
    const deleteIncome = async (id: string | number) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error: any) {
            console.log('Error deleting income', error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    }

    const handleDownloadIncomeDetails = async (year: number, month: number) => {
        setExportLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD(year, month), { responseType: "blob" });
            const filename = `income_details_${year}_${month}.xlsx`;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download income details successfully");
            setExportModalState({ show: false, action: null });
        } catch (error) {
            console.error('Error downloading income details:', error);
            toast.error("Failed to download income");
        } finally {
            setExportLoading(false);
        }
    }

    const handleEmailIncomeDetails = async (year: number, month: number) => {
        setExportLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME(year, month));
            if (response.status === 200) {
                toast.success("Income details emailed successfully");
                setExportModalState({ show: false, action: null });
            }
        } catch (error) {
            console.error('Error emailing income details:', error);
            toast.error("Failed to email income");
        } finally {
            setExportLoading(false);
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories()
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <>
                            {/* Chart Skeleton */}
                            <div className="bg-card p-4 sm:p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col h-[350px]">
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

                            {/* List Skeleton */}
                            <div className="bg-card p-4 sm:p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm mt-4">
                                <div className="flex justify-between items-center mb-6">
                                    <Skeleton className="h-5 w-1/3 rounded-md min-w-[100px]" />
                                    <Skeleton className="h-4 w-16 rounded-md shrink-0" />
                                </div>
                                <div className="space-y-5 w-full">
                                    {Array(5).fill(0).map((_, i) => (
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
                        </>
                    ) : (
                        <>
                            <div>
                                {/* overview for income with line char */}
                                <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                            </div>

                            <IncomeList
                                transactions={incomeData}
                                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                                onDownload={() => setExportModalState({ show: true, action: 'download' })}
                                onEmail={() => setExportModalState({ show: true, action: 'email' })}
                            />
                        </>
                    )}

                    {/* Add Income Modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete Income Modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Are you sure want to delete this income details?"
                            onDelete={() => deleteIncome(openDeleteAlert.data!)}
                        />
                    </Modal>

                    {/* Export Modal */}
                    <Modal
                        isOpen={exportModalState.show}
                        onClose={() => setExportModalState({ show: false, action: null })}
                        title={exportModalState.action === 'download' ? 'Download Income Details' : 'Email Income Details'}
                    >
                        <ExportModal
                            loading={exportLoading}
                            onExport={(year, month) => {
                                if (exportModalState.action === 'download') {
                                    handleDownloadIncomeDetails(year, month);
                                } else if (exportModalState.action === 'email') {
                                    handleEmailIncomeDetails(year, month);
                                }
                            }}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income;
