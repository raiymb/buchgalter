import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: 'student' | 'instructor' | 'admin';
  };
}


export const roleMiddleware = (roles: IUser['role'][]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};