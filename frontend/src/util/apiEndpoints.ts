export const BASE_URL: string = "http://localhost:8080/api/v1";
const CLOUDINARY_CLOUD_NAME: string = "dhadf5h7j";

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
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId: string | number) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
    EMAIL_EXPENSE: "/email/expense-excel",
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
};
