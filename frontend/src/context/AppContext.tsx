import { createContext, useState, ReactNode } from "react";
import type { AppContextValue, User } from "../types";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);

    const clearUser = () => {
        setUser(null);
    }

    const contextValue: AppContextValue = {
        user,
        setUser,
        clearUser
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
