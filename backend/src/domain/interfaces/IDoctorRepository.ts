import { Doctor } from "../entities/Doctor";

export interface DoctorRepository {
  registerDoctor(doctor: Doctor): Promise<Doctor>;
  findByEmail(email: string): Promise<Doctor | null>;
}
