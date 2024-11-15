import { moduleRepository } from '../repositories/moduleRepository';
import { IModule } from '../models/Module';

export const moduleService = {
  async createModule(moduleData: Partial<IModule>): Promise<IModule> {
    return await moduleRepository.createModule(moduleData);
  },

  async getModuleById(id: string): Promise<IModule | null> {
    return await moduleRepository.getModuleById(id);
  },

  async getModulesByCourse(courseId: string): Promise<IModule[]> {
    return await moduleRepository.getModulesByCourse(courseId);
  },

  async updateModule(id: string, updateData: Partial<IModule>): Promise<IModule | null> {
    return await moduleRepository.updateModule(id, updateData);
  },

  async deleteModule(id: string): Promise<void> {
    await moduleRepository.deleteModule(id);
  }
};