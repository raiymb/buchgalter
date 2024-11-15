import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || 'your_refresh_jwt_secret_key';

export const generateToken = (user: IUser): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const verifyRefreshToken = (refreshToken: string): any => {
  try {
    return jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const refreshAccessToken = (refreshToken: string): string => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { id: string };
    return jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '1d' });
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};