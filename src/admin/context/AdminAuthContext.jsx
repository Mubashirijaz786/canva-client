import { createContext, useContext } from "react";

// Sirf Context aur Hook export karein
export const AdminAuthContext = createContext({});

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
};