import axios from 'axios';

const BASE_URL = 'https://canva-server-production.up.railway.app/api';

axios.defaults.withCredentials = true;

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// ✅ 1. REQUEST INTERCEPTOR: Token attach karega
axiosPrivate.interceptors.request.use(
    config => {
        const authData = localStorage.getItem('auth');
        if (authData) {
            const token = JSON.parse(authData)?.accessToken;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

// ✅ 2. RESPONSE INTERCEPTOR: 401 aur 403 dono par refresh karega
axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;

        // ✅ Yahan 401 ke sath 403 bhi add kiya hai kyunki expiry par 403 aata hai
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
                // Refresh hamesha axiosPublic se karein
                const response = await axiosPublic.get('/auth/refresh');
                const newToken = response.data.accessToken;

                // LocalStorage update karein
                const auth = JSON.parse(localStorage.getItem('auth'));
                localStorage.setItem('auth', JSON.stringify({ ...auth, accessToken: newToken }));

                // Naya token header mein lagayein aur repeat karein
                prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosPrivate(prevRequest);
            } catch (refreshErr) {
                localStorage.removeItem('auth');
                // window.location.href = '/login'; 
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);