import { Request, Response, NextFunction } from 'express';
import { verifyToken, refreshAccessToken } from '../utils/jwtUtils';
import logger from '../utils/logger';

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}


export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const refreshTokenMiddleware = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
  }

  try {
    const newAccessToken = refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    logger.error('Refresh token error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid refresh token' });
  }
};
