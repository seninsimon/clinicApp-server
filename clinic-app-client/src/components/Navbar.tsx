// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Brand */}
      <div className="text-2xl font-bold">
        <Link to="/">Amazing Care</Link>
      </div>

      {/* Navigation */}
      <div className="flex space-x-6 items-center">
        <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>

        {user && user.role === 'patient' && (
          <>
            <Link to="/appointment" className="hover:text-blue-200 transition-colors">Appointment</Link>
            <Link to="/profile" className="hover:text-blue-200 transition-colors">Profile</Link>
          </>
        )}

        {user && user.role === 'doctor' && (
          <>
            <Link to="/doctor" className="hover:text-blue-200 transition-colors">Dashboard</Link>
            <Link to="/profile" className="hover:text-blue-200 transition-colors">Profile</Link>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Link to="/admin" className="hover:text-blue-200 transition-colors">Admin Panel</Link>
          </>
        )}

        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
