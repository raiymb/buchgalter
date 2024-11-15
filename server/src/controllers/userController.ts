import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { IUser } from '../models/User';

export const userController = {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userRole = req.body.role;
      if (userRole && userRole !== 'student') {
        return res.status(403).json({ message: 'Unauthorized to create user with specified role' });
      }
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async findByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.findByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async findByGoogleId(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.findByGoogleId(req.params.googleId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userRole = req.body.role;
      if (userRole && userRole !== 'student') {
        return res.status(403).json({ message: 'Unauthorized to update user role' });
      }
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers(req.query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};