import axios from '../api/axiosInstance';

import type { RegisterInput , VerifyOtpInput  } from '../types/User';

export const registerUser = async (data: RegisterInput) => {
  const res = await axios.post('/register', data);
  console.log(res)
  return res.data;
};

export const verifyOtp = async (data: VerifyOtpInput) => {
  const res = await axios.post('/verify-otp', data);
  console.log(res)
  return res.data;
};
