import React, { useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

export const AdminAuthProvider = ({ children }) => {
    const [adminAuth, setAdminAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AdminAuthContext.Provider value={{ adminAuth, setAdminAuth, isLoading, setIsLoading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};