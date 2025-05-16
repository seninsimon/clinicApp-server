import { UserMongoRepo } from '../../infrastructure/database/repositories/UserMongoRepo';
import { generateAccessToken, verifyRefreshToken , verifyAccessToken } from "../../application/utils/generateAccessToken"

export class AuthService {
  private userRepo: UserMongoRepo;

  constructor(userRepo: UserMongoRepo) {
    this.userRepo = userRepo;
  }

  async verifyAccessToken(token: string) {
    try {
      const payload = verifyAccessToken(token);
      return payload;
    } catch (err) {
      throw new Error('Invalid or expired access token');
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      const payload = verifyRefreshToken(token);
      // Check user still exists and is valid
      const user = await this.userRepo.findById(payload.sub as string);
      if (!user) throw new Error('User not found');
      return user;
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const user = await this.verifyRefreshToken(refreshToken);
    // Generate new access token
    const newAccessToken = generateAccessToken(user._id!,user.role);
    return { accessToken: newAccessToken, user };
  }
}
