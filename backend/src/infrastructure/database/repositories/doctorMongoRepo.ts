import { Doctor } from "../../../domain/entities/Doctor";
import { DoctorRepository } from "../../../domain/interfaces/IDoctorRepository";
import { DoctorModel } from "../schemas/DoctorSchema";

export const doctorRepositoryImpl = (): DoctorRepository => {
  return {
    async registerDoctor(doctor: Doctor): Promise<Doctor> {
      const newDoctor = new DoctorModel(doctor);
      const saved = await newDoctor.save();

      return {
 
        firstname: saved.firstname,
        lastname: saved.lastname,
        email: saved.email,
        password: saved.password,
        phone: saved.phone,
        specialisation: saved.specialisation,
        experience: saved.experience,
        fee: saved.fee,
        status: saved.status,
        isBlocked: saved.isBlocked,
        googleVerified: saved.googleVerified,
        additionalInfo: saved.additionalInfo,
        profilePicture: saved.profilePicture,
        medicalLicence: saved.medicalLicence,
      };
    },

    async findByEmail(email: string): Promise<Doctor | null> {
      const result = await DoctorModel.findOne({ email });
      if (!result) return null;
      return {
        
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        password: result.password,
        phone: result.phone,
        specialisation: result.specialisation,
        experience: result.experience,
        fee: result.fee,
        status: result.status,
        isBlocked: result.isBlocked,
        googleVerified: result.googleVerified,
        additionalInfo: result.additionalInfo,
        profilePicture: result.profilePicture,
        medicalLicence: result.medicalLicence,
      };
    },
  };
};
