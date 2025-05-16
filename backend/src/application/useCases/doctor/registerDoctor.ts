import { DoctorRepository } from "../../../domain/interfaces/IDoctorRepository";
import { Doctor } from "../../../domain/entities/Doctor";

export const registerDoctor = async (doctorData: Doctor,doctorRepo: DoctorRepository ): Promise<Doctor> => {
 
    const existing = await doctorRepo.findByEmail(doctorData.email);
  
    if (existing) {
  
        throw new Error("Doctor already registered with this email.");
  }

  doctorData.status = "Pending";
  doctorData.isBlocked = false;

  const newDoctor = await doctorRepo.registerDoctor(doctorData);
  return newDoctor;
};
