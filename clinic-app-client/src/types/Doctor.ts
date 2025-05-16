export interface DoctorRegisterInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  specialisation?: string;
  experience: number;
  fee: number;
  medicalLicence: File | null;
}