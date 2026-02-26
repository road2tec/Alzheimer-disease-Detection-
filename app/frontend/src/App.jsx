import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HowItWorks from './pages/HowItWorks'
import Features from './pages/Features'
import About from './pages/About'
import WhyUs from './pages/WhyUs'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorList from './pages/DoctorList'
import DoctorPlans from './pages/DoctorPlans'
import SubscriptionPage from './pages/SubscriptionPage'
import ReviewPage from './pages/ReviewPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
    const { loading } = useAuth();
    const location = useLocation();

    // Do not show the top site navbar on the application dashboards
    const hideNavbarRoutes = ['/dashboard', '/admin', '/doctor'];
    const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

    if (loading) return <div className="h-screen flex items-center justify-center text-medical-600 font-bold">Initializing...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {!shouldHideNavbar && <Navbar />}
            <main className={`flex-grow ${!shouldHideNavbar ? 'pt-24' : ''}`}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/why-us" element={<WhyUs />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <UserDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/doctors" element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <DoctorList />
                        </ProtectedRoute>
                    } />

                    <Route path="/plans/:doctorId" element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <DoctorPlans />
                        </ProtectedRoute>
                    } />

                    <Route path="/subscribe/:doctorId/:planId" element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <SubscriptionPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/review/:doctorId" element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <ReviewPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/doctor" element={
                        <ProtectedRoute allowedRoles={['doctor']}>
                            <DoctorDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
