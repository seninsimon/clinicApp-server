import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../application/utils/generateAccessToken';

export interface AuthRequest extends Request {
  user?: { sub: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Check for token in cookies first, then authorization header
    let token = req.cookies.accessToken;
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      res.status(401).json({ message: 'No access token provided' });
      return;
    }

    const decoded = verifyAccessToken(token) as { sub: string; role: string };
    
    if (!decoded || !decoded.sub) {
      res.status(401).json({ message: 'Invalid token format' });
      return;
    }
    
    req.user = { sub: decoded.sub, role: decoded.role };
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
