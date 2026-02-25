import { createContext, useState, useContext } from "react";

const AdminAuthContext = createContext({});

export const AdminAuthProvider = ({ children }) => {
    const [adminAuth, setAdminAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    return (
        <AdminAuthContext.Provider value={{ adminAuth, setAdminAuth, isLoading, setIsLoading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);