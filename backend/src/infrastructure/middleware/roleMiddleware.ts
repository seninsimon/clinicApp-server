import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { Role } from '../../domain/entities/User';

/**
 * Middleware to restrict access based on user roles
 * @param allowedRoles Array of roles that are allowed to access the route
 */
export const checkRole = (allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      // First check if user exists in request (set by authenticate middleware)
      if (!req.user || !req.user.role) {
        res.status(401).json({ message: 'Unauthorized access' });
        return;
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(req.user.role as Role)) {
        res.status(403).json({ 
          message: 'Access forbidden: You do not have permission to access this resource' 
        });
        return;
      }

      // If role is allowed, proceed
      next();
    } catch (err) {
      console.error('Role check error:', err);
      res.status(500).json({ message: 'Internal server error during authorization' });
    }
  };
};
