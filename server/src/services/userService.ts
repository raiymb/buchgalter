import { userRepository } from '../repositories/userRepository';
import { IUser } from '../models/User';

export const userService = {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return await userRepository.createUser(userData);
  },

  async findByEmail(email: string): Promise<IUser | null> {
    return await userRepository.findByEmail(email);
  },

  async findById(id: string): Promise<IUser | null> {
    return await userRepository.findById(id);
  },

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await userRepository.updateUser(id, updateData);
  },

  async findByGoogleId(googleId: string): Promise<IUser | null> {
    return await userRepository.findByGoogleId(googleId);
  },
  async deleteUser(id: string): Promise<void> {
    await userRepository.deleteUser(id);
  },
  async getAllUsers(filters: any = {}): Promise<IUser[]> {
    return await userRepository.getAllUsers(filters);
  },
  async getActiveUsersCount(): Promise<number> {
    return await userRepository.countActiveUsers();
  }
};