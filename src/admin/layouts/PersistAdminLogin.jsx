import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import { useAdminAuth } from "../context/AdminAuthContext";

const PersistAdminLogin = () => {
    const { adminAuth, setAdminAuth, setIsLoading } = useAdminAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                const response = await axiosPrivate.get('/auth/refresh');
                
                if (isMounted) {
                    setAdminAuth({
                        accessToken: response.data.accessToken,
                        role: response.data.role,
                        name: response.data.name,
                        email: response.data.email
                    });
                }
            } catch (err) {
                console.error("Session expired.");
                if (isMounted) setAdminAuth(null);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (!adminAuth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => { isMounted = false; };
    }, []);

    return <Outlet />;
};


export default PersistAdminLogin;