import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        const _id = localStorage.getItem('_id');

        if (token && role) {
            setUser({ token, role, name, _id });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await authApi.login({ email, password });
            const userData = { token: res.data.token, role: res.data.role, name: res.data.name, _id: res.data._id };

            localStorage.setItem('token', userData.token);
            localStorage.setItem('role', userData.role);
            localStorage.setItem('name', userData.name);
            if (userData._id) localStorage.setItem('_id', userData._id);

            setUser(userData);
            return userData;
        } catch (err) {
            throw err;
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const res = await authApi.signup({ name, email, password, role });
            const userData = { token: res.data.token, role: res.data.role, name: res.data.name || name, _id: res.data._id };

            localStorage.setItem('token', userData.token);
            localStorage.setItem('role', userData.role);
            localStorage.setItem('name', userData.name);
            if (userData._id) localStorage.setItem('_id', userData._id);

            setUser(userData);
            return userData;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
