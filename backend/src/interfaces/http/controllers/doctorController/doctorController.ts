import { Request, Response } from "express";
import { registerDoctor } from "../../../../application/useCases/doctor/registerDoctor";
import { doctorRepositoryImpl } from "../../../../infrastructure/database/repositories/doctorMongoRepo";

const doctorRepo = doctorRepositoryImpl();

export const DoctorController = {
  register: async (req: Request, res: Response) => {
    try {
      const doctor = await registerDoctor(req.body, doctorRepo);
      res.status(201).json({ message: "Doctor registered", doctor });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};
