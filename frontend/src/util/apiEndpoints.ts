export const BASE_URL: string = "https://financemanager-0296.onrender.com/api/v1";
const CLOUDINARY_CLOUD_NAME: string = "dz5izi0p8";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId: string | number) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type: string) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId: string | number) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: (year: number, month: number) => `/excel/download/income?year=${year}&month=${month}`,
    EMAIL_INCOME: (year: number, month: number) => `/email/income-excel?year=${year}&month=${month}`,
    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId: string | number) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: (year: number, month: number) => `/excel/download/expense?year=${year}&month=${month}`,
    EMAIL_EXPENSE: (year: number, month: number) => `/email/expense-excel?year=${year}&month=${month}`,
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    GOOGLE_AUTH: `${BASE_URL}/oauth2/authorization/google`,
    OAUTH2_EXCHANGE: "/oauth2/exchange",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
};
