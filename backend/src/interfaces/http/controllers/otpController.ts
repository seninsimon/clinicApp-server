import { Request, Response } from "express";
import { UserMongoRepo } from "../../../infrastructure/database/repositories/UserMongoRepo";
import { VerifyOtp } from "../../../application/useCases/VerifyOtp";

const userRepo = new UserMongoRepo();
const verifyOtpUseCase = new VerifyOtp(userRepo);

export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    // email verified
    const result = await verifyOtpUseCase.execute({ email, otp });
    res.status(200).json(result); 

  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
