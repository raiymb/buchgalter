import { userRepository } from '../repositories/userRepository';
import { hashPassword, comparePassword } from '../utils/hashUtils';
import { generateToken } from '../utils/jwtUtils';
import { IUser } from '../models/User';

export const authService = {
  // Register a new user
  async registerUser(name: string, email: string, password: string): Promise<IUser> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);
    return await userRepository.createUser({ name, email, password: hashedPassword });
  },

  // Login user and return JWT token
  async loginUser(email: string, password: string): Promise<string> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    return generateToken(user._id.toString(), user.role);
  },

  // Find a user by email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.findByEmail(email);
  },
};