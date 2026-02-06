import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    // Refresh token logic would go here
                    // const { data } = await axios.post('/auth/refresh/', { refresh: refreshToken });
                    // localStorage.setItem('access_token', data.access);
                    // api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                    // return api(originalRequest);
                } catch (refreshError) {
                    // Logout
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
