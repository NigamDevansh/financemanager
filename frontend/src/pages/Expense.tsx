import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Dashboard from "../components/Dashboard";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import { Skeleton } from "../components/ui/skeleton";
import type { Transaction, Category, ExpenseFormData, DeleteAlertState } from "../types";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
        show: false,
        data: null,
    });

    // Get All Expense Details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(
                `${API_ENDPOINTS.GET_ALL_EXPENSE}`
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense details:", error);
            toast.error("Failed to fetch expense details.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Expense Categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
            );
            if (response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense categories:", error);
            toast.error("Failed to fetch expense categories.");
        }
    };


    // Handle Add Expense
    const handleAddExpense = async (expense: ExpenseFormData) => {
        const { name, categoryId, amount, date, icon } = expense;

        if (!name.trim()) {
            toast.error("Name is required.");
            return;
        }

        if (!categoryId) {
            toast.error("Category is required.");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error('Date cannot be in the future');
            return;
        }

        try {
            await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                categoryId,
                amount: Number(amount),
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
            fetchExpenseCategories();
        } catch (error: any) {
            console.error(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || "Failed to add expense.");
        }
    };

    // Delete Expense
    const deleteExpense = async (id: string | number) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error: any) {
            console.error(
                "Error deleting expense:",
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || "Failed to delete expense.");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
                {
                    responseType: "blob",
                }
            );

            const filename = "expense_details.xlsx";

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Expense details downloaded successfully!");
        } catch (error) {
            console.error("Error downloading expense details:", error);
            toast.error("Failed to download expense details. Please try again.");
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Email sent");
            }
        } catch (e) {
            console.error("Error emailing expense details:", e);
            toast.error("Failed to email expense details. Please try again.");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
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
                            <div className="">
                                <ExpenseOverview
                                    transactions={expenseData}
                                    onExpenseIncome={() => setOpenAddExpenseModal(true)}
                                />
                            </div>

                            <ExpenseList
                                transactions={expenseData}
                                onDelete={(id) => {
                                    setOpenDeleteAlert({ show: true, data: id });
                                }}
                                onDownload={handleDownloadExpenseDetails}
                                onEmail={handleEmailExpenseDetails}
                            />
                        </>
                    )}

                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={handleAddExpense}
                            categories={categories}
                        />
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense detail?"
                            onDelete={() => deleteExpense(openDeleteAlert.data!)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};

export default Expense;
