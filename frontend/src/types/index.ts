import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
    fullName: string;
    email: string;
    profileImageUrl?: string;
}

// ─── App Context ─────────────────────────────────────────────────────────────

export interface AppContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    clearUser: () => void;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
    id: string | number;
    name: string;
    type: string;
    icon: string;
}

export interface CategoryFormData {
    name: string;
    type: string;
    icon: string;
}

// ─── Transaction / Income / Expense ──────────────────────────────────────────

export interface Transaction {
    id: string | number;
    name: string;
    amount: number;
    date: string;
    icon: string;
    type?: string;
    categoryName?: string;
    categoryId?: string | number;
}

export interface IncomeFormData {
    name: string;
    amount: string;
    date: string;
    icon: string;
    categoryId: string;
}

export interface ExpenseFormData {
    name: string;
    amount: string;
    date: string;
    icon: string;
    categoryId: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardData {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    recentTransactions: Transaction[];
    recent5Expenses: Transaction[];
    recent5Incomes: Transaction[];
}

// ─── Chart Data ──────────────────────────────────────────────────────────────

export interface ChartDataItem {
    date: string;
    amount: number;
    categoryName?: string;
}

export interface ChartDataPoint {
    date: string;
    totalAmount: number;
    items: ChartDataItem[];
    month?: string;
}

export interface PieChartDataItem {
    name: string;
    amount: number;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export interface SideBarItem {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface DashboardProps {
    children: ReactNode;
    activeMenu: string;
}

export interface SidebarProps {
    activeMenu: string;
}

export interface MenubarProps {
    activeMenu: string;
}

export interface InfoCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    color: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

export interface InputOption {
    value: string | number;
    label: string;
}

export interface InputProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    type?: string;
    isSelect?: boolean;
    options?: InputOption[];
}

export interface DeleteAlertProps {
    content: string;
    onDelete: () => Promise<void> | void;
}

export interface EmojiPickerPopupProps {
    icon: string;
    onSelect: (iconUrl: string) => void;
}

export interface ProfilePhotoSelectorProps {
    image: File | null;
    setImage: (file: File | null) => void;
}

export interface TransactionInfoCardProps {
    icon: string;
    title: string;
    date: string;
    amount: number;
    type: string;
    hideDeleteBtn?: boolean;
    onDelete?: () => void;
}

export interface AddCategoryFormProps {
    onAddCategory: (category: CategoryFormData | Category) => Promise<void> | void;
    initialCategoryData?: Category | null;
    isEditing?: boolean;
}

export interface AddIncomeFormProps {
    onAddIncome: (income: IncomeFormData) => Promise<void> | void;
    categories: Category[];
}

export interface AddExpenseFormProps {
    onAddExpense: (expense: ExpenseFormData) => Promise<void> | void;
    categories: Category[];
}

export interface CategoryListProps {
    categories: Category[];
    onEditCategory: (category: Category) => void;
}

export interface IncomeListProps {
    transactions: Transaction[];
    onDelete: (id: string | number) => void;
    onDownload: () => Promise<void> | void;
    onEmail: () => Promise<void> | void;
}

export interface ExpenseListProps {
    transactions: Transaction[];
    onDelete: (id: string | number) => void;
    onDownload: () => Promise<void> | void;
    onEmail: () => Promise<void> | void;
}

export interface IncomeOverviewProps {
    transactions: Transaction[];
    onAddIncome: () => void;
}

export interface ExpenseOverviewProps {
    transactions: Transaction[];
    onExpenseIncome: () => void;
}

export interface FinanceOverviewProps {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

export interface CustomLineChartProps {
    data: ChartDataPoint[];
}

export interface CustomPieChartProps {
    data: PieChartDataItem[];
    label: string;
    totalAmount: string;
    showTextAnchor?: boolean;
    colors: string[];
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
}

export interface CustomLegendProps {
    payload?: Array<{ color: string; value: string }>;
}

export interface TransactionsProps {
    transactions: Transaction[];
    onMore: () => void;
    type: string;
    title: string;
}

export interface RecentTransactionsProps {
    transactions: Transaction[];
    onMore: () => void;
}

// ─── Delete Alert State ──────────────────────────────────────────────────────

export interface DeleteAlertState {
    show: boolean;
    data: string | number | null;
}

// ─── Filter Form ─────────────────────────────────────────────────────────────

export interface FilterRequest {
    type: string;
    startDate: string;
    endDate: string;
    keyword: string;
    sortField: string;
    sortOrder: string;
}

// ─── Assets ──────────────────────────────────────────────────────────────────

export interface Assets {
    logo: string;
}
