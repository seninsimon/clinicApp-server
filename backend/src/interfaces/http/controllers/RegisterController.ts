import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { RegisterUser } from "../../../application/useCases/RegisterUser";
import { UserMongoRepo } from "../../../infrastructure/database/repositories/UserMongoRepo";
import { NodeMailerService } from "../../../infrastructure/services/NodemailerService";

const userRepo = new UserMongoRepo();  //database working like creating user
//dependency injection // infrastructure database working injected to usecase
const emailService = new NodeMailerService()

const registerUseCase = new RegisterUser(userRepo , emailService ); // logic to add user this is a usecase

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUseCase.execute({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};
