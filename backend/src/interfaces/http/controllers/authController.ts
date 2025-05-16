import { Request, Response } from 'express';
import { AuthService } from '../../../infrastructure/services/JwtService';
import { UserMongoRepo } from '../../../infrastructure/database/repositories/UserMongoRepo';

const userRepo = new UserMongoRepo();
const authService = new AuthService(userRepo);

export class AuthController {
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      // Get refresh token from cookie or authorization header
      let refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
          refreshToken = authHeader.substring(7);
        }
      }
      
      if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
      }

      const { accessToken, user } = await authService.refreshAccessToken(refreshToken);

      // Set secure cookies
      const isProduction = process.env.NODE_ENV === 'production';
      
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
      });

      // Don't return sensitive information
      const { password: _, ...safeUserData } = user;

      res.status(200).json({ user: safeUserData });
    } catch (err) {
      console.error('Token refresh error:', err);
      res.status(401).json({ 
        message: err instanceof Error ? err.message : 'Invalid or expired refresh token'
      });
    }
  }
}
