import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    signup: (data) => api.post('/auth/signup', data),
};

export const predictApi = {
    predict: (formData) => api.post('/predict_logic/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    history: () => api.get('/predict_logic/history'),
};

export const adminApi = {
    getStats: () => api.get('/admin/stats'),
    getUsers: () => api.get('/admin/users'),
};

export default api;
