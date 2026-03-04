import axios from 'axios';

const BASE_URL = 'https://canva-server-production.up.railway.app/api' ;
// const BASE_URL_LOCAL = 'http://localhost:5000/api';

axios.defaults.withCredentials = true;

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


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

axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;

       
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
               
                const response = await axiosPublic.get('/auth/refresh');
                const newToken = response.data.accessToken;

                
                const auth = JSON.parse(localStorage.getItem('auth'));
                localStorage.setItem('auth', JSON.stringify({ ...auth, accessToken: newToken }));

                
                prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosPrivate(prevRequest);
            } catch (refreshErr) {
                localStorage.removeItem('auth');
               
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);