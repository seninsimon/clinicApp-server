import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/authService';

const VerifyOtp: React.FC = () => {
  const location = useLocation();
  const email = (location.state as any)?.email || '';

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp });
      setMessage(res.message);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-4">Verify OTP</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Please enter the OTP sent to your email: <span className="font-medium text-blue-600">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Verify
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
