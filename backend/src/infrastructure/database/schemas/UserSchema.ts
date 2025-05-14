import mongoose from "mongoose";
import { User } from "../../../domain/entities/User";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'patient', 'doctor'], default: 'patient' },
  isBlocked: { type: Boolean, default: false },
  otp: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
  otpExpiry: { type: Date, required: false },
});

export const UserModel = mongoose.model<User>("User", userSchema);
   