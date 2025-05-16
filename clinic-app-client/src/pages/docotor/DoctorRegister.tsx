import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { DoctorRegisterInput } from '../../types/Doctor';
import { registerDoctor } from '../../services/doctor/authService';

const DoctorRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DoctorRegisterInput>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    specialisation: '',
    experience: 0,
    fee: 0,
    medicalLicence: null,
  });

  const mutation = useMutation({
    mutationFn: registerDoctor,
    onSuccess: () => navigate('/login'),
    onError: (err: any) => alert(err.response?.data?.error || 'Registration failed'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'medicalLicence' && files) {
      setFormData(prev => ({ ...prev, medicalLicence: files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'experience' || name === 'fee' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      const value = (formData as any)[key];
      if (value !== null && value !== undefined) {
        form.append(key, value);
      }
    }

    mutation.mutate(form as any); // sending FormData
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md" encType="multipart/form-data">
        <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>

        {['firstname', 'lastname', 'email', 'password', 'phone', 'specialisation'].map(field => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              id={field}
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm"
              required={field !== 'specialisation'}
            />
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience (in years)
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
            Consultation Fee
          </label>
          <input
            id="fee"
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleChange}
            className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="medicalLicence" className="block text-sm font-medium text-gray-700">
            Upload Medical Licence
          </label>
          <input
            id="medicalLicence"
            name="medicalLicence"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {mutation.isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default DoctorRegister;
