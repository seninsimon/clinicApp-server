import { Request, Response } from 'express';
import { getUserById } from '../../../application/useCases/getUserbyId';
import { UserMongoRepo } from '../../../infrastructure/database/repositories/UserMongoRepo';
import { AuthRequest } from '../../../infrastructure/middleware/authMiddleware';

const userRepo = new UserMongoRepo();

export const GetMeController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.sub) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await getUserById(req.user.sub, userRepo);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // User data is already safe as getUserById returns only non-sensitive fields
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error in GetMeController:', err);
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
