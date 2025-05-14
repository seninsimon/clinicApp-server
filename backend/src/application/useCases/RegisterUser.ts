import { User } from "../../domain/entities/User";

import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IEmailService } from "../services/IEmailService";

import { generateOtp } from "../utils/generateOtp";

export class RegisterUser {
  
    constructor( private userRepo: IUserRepository,
  
                private emailService : IEmailService
    ) {}

  async execute(userData: {
    
    name: string;
    
    email: string;
    
    password: string;
    
    role?: "admin" | "patient" | "doctor";
  }) {
    
    const existingUser = await this.userRepo.findByEmail(userData.email);

    if (existingUser) {
    
        if (existingUser.isVerified) {
    
            throw new Error("Email already in use");
    
        } else {
    
            // Resend OTP
    
            const newOtp = generateOtp();
    
            existingUser.setOtp(newOtp);
    
            await this.userRepo.updatUser(existingUser)
    
            await this.emailService.sendEmail(existingUser.email , `your otp is ${newOtp}`)

        return { message: "OTP resent to your email" };
      }
    }



    const newUser = new User(
    
        userData.name,
    
        userData.email,
    
        userData.password,
    
        userData.role 
    );

     
    
    const otp = generateOtp(); 
    
    newUser.setOtp(otp);
    
    await this.emailService.sendEmail(newUser.email, `Your OTP is: ${otp}`);
    
    await this.userRepo.createUser(newUser);


     return { message: "OTP sent to your email" };

  }
}
