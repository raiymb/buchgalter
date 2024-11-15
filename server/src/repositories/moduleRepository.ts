import Module, { IModule } from '../models/Module';
import { Types } from 'mongoose';

export const moduleRepository = {
  // Create a new module
  async createModule(moduleData: Partial<IModule>): Promise<IModule> {
    const module = new Module(moduleData);
    return await module.save();
  },

  // Get a module by ID
  async getModuleById(id: string): Promise<IModule | null> {
    return await Module.findById(id).populate('lessons quiz').exec();
  },

  // Get all modules for a specific course
  async getModulesByCourse(courseId: string): Promise<IModule[]> {
    return await Module.find({ courseId }).populate('lessons quiz').exec();
  },

  // Update a module by ID
  async updateModule(id: string, updateData: Partial<IModule>): Promise<IModule | null> {
    return await Module.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a module by ID
  async deleteModule(id: string): Promise<void> {
    await Module.findByIdAndDelete(id).exec();
  }
};
