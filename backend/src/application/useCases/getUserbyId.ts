
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export const getUserById = async (userId: string, userRepo: IUserRepository) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error('User not found');

  return {
    id: user._id,
    name: user.name,
    role: user.role,
  };
};
