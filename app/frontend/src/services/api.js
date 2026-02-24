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
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    updateRole: (id, role) => api.post(`/admin/users/${id}/role`, { role }),
};

export const doctorApi = {
    getPatients: () => api.get('/doctor/patients'),
};

export const feedbackApi = {
    submit: (data) => api.post('/feedback/', data),
    getAll: () => api.get('/feedback/'),
};

export const planApi = {
    getPlans: () => api.get('/plans/'),
};

export default api;
