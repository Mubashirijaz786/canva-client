import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = () => {
    const { adminAuth, isLoading } = useAdminAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white italic">
                Authenticating...
            </div>
        );
    }

    return (
        adminAuth?.accessToken 
            ? <Outlet /> 
            : <Navigate to="/admin-login" state={{ from: location }} replace />
    );
};


export default AdminProtectedRoute;