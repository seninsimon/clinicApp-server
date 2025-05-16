import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Your backend URL
  withCredentials: true, // Very important for cookies to be sent
});

// Request interceptor (optional, e.g., attach tokens if you want, but with HttpOnly cookies this is not needed)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error, try refresh token once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token endpoint (which issues new access token cookie)
        await axiosInstance.post('/refresh-token');
        // Retry original request after refresh token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or clear user session (handle in React)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
