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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Session expired or unauthorized request. Clearing session...");
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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
    createDoctor: (data) => api.post('/admin/doctors', data),
};

export const doctorApi = {
    getPatients: () => api.get('/doctor/patients'),
    getSubscribedPatients: () => api.get('/subscriptions/doctor/patients'),
};

export const feedbackApi = {
    submit: (data) => api.post('/feedback/', data),
    getAll: () => api.get('/feedback/'),
};

export const planApi = {
    getPlans: (doctorId) => api.get(`/plans/${doctorId ? `?doctorId=${doctorId}` : ''}`),
    createPlan: (data) => api.post('/plans/', data),
    deletePlan: (id) => api.delete(`/plans/${id}`),
};

export const subscriptionApi = {
    subscribe: (data) => api.post('/subscriptions/', data),
    getMySubscriptions: () => api.get('/subscriptions/mine'),
};

export const reviewApi = {
    addReview: (data) => api.post('/reviews/', data),
    getDoctorReviews: (doctorId) => api.get(`/reviews/doctor/${doctorId}`),
    deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default api;
