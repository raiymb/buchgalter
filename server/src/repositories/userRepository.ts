// /repositories/userRepository.ts
import User, { IUser } from '../models/User';

export const userRepository = {
  // Create a new user
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  },

  // Find a user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  },

  // Find a user by ID
  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).exec();
  },

  // Update user details by ID
  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Find a user by Google ID (for OAuth-based login)
  async findByGoogleId(googleId: string): Promise<IUser | null> {
    return await User.findOne({ googleId }).exec();
  },
  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  },

  // Get all users with optional filters (admin functionality)
  async getAllUsers(filters: any = {}): Promise<IUser[]> {
    return await User.find(filters).exec();
  },
  async countActiveUsers(): Promise<number> {
    return await User.countDocuments({ isActive: true }).exec();
  }
};
