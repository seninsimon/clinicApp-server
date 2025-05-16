export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'patient' | 'doctor';
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
}
