import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">AmazingCare</h3>
          <p className="text-sm leading-relaxed">
            AmazingCare Specialist Clinics provide top-quality online healthcare with trusted specialists. 
            Book appointments, consult doctors, and access healthcare from the comfort of your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-500 transition">Home</a>
            </li>
            <li>
              <a href="/appointment" className="hover:text-blue-500 transition">Book Appointment</a>
            </li>
            <li>
              <a href="/specialities" className="hover:text-blue-500 transition">Specialities</a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-blue-500 transition">Doctors</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500 transition">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <p className="text-sm">
            <strong>Address:</strong> 123 Health St, Wellness City, Country
          </p>
          <p className="text-sm mt-2">
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p className="text-sm mt-2">
            <strong>Email:</strong> support@amazingcare.com
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.466.099 2.797.143v3.24h-1.92c-1.506 0-1.797.716-1.797 1.765v2.316h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.832 9.832 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.523 6.56 4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.085 4.919 4.919 0 0 0 4.588 3.417A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.48-1.5-2.48-1.5 0-1.73 1.17-1.73 2.4v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.98 3.58 4.56v4.75z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AmazingCare Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
