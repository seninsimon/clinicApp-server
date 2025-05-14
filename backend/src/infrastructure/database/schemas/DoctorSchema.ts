import mongoose, { Schema, Document } from "mongoose";

export interface DoctorDocument extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  specialisation: string | null;
  experience: number;
  fee: number;
  status: "Approved" | "Rejected" | "Pending";
  isBlocked: boolean;
  googleVerified?: boolean;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
}

const doctorSchema = new Schema<DoctorDocument>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  specialisation: { type: String, default: null },
  experience: { type: Number, required: true },
  fee: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
  isBlocked: { type: Boolean, default: false },
  googleVerified: { type: Boolean, default: false },
  additionalInfo: { type: String },
  profilePicture: { type: String },
  medicalLicence: { type: String },
});

export const DoctorModel = mongoose.model<DoctorDocument>("Doctor", doctorSchema);
