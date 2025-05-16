// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import VerifyOtp from '../pages/VerifyOtp';
import DoctorRegister from '../pages/docotor/DoctorRegister';
import Login from '../pages/Login';
import LandingPage from '../pages/LandingPage';

import AdminDashboard from '../pages/admin/AdminDashboard';
import DoctorDashboad from '../pages/docotor/DoctorDashboad';
import Profie from '../pages/Profie';
import Unotherized from '../pages/Unotherized';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/doctor-register" element={<DoctorRegister />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="/unauthorized" element={<Unotherized />} />

    {/* Protected Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor"
      element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorDashboad />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patient"
      element={
        <ProtectedRoute allowedRoles={['patient']}>
          <Profie />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
