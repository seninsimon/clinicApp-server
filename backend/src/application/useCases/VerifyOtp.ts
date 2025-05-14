// src/application/useCases/VerifyOtp.ts

import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class VerifyOtp {
  constructor(private userRepo: IUserRepository) {}

  async execute(data: { email: string; otp: string }) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.otp || !user.otpExpiry) {
      throw new Error("OTP not set");
    }

    const now = new Date();

    if (user.otp !== data.otp) {
      throw new Error("Invalid OTP");
    }

    if (now > new Date(user.otpExpiry)) {
      throw new Error("OTP expired");
    }

    // OTP is valid → mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await this.userRepo.updatUser(user);

    return { message: "Email verified successfully" };
  }
}
