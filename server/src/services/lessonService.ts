import { lessonRepository } from '../repositories/lessonRepository';
import { ILesson } from '../models/Lesson';

export const lessonService = {
  async createLesson(lessonData: Partial<ILesson>): Promise<ILesson> {
    return await lessonRepository.createLesson(lessonData);
  },

  async getLessonById(id: string): Promise<ILesson | null> {
    return await lessonRepository.getLessonById(id);
  },

  async getLessonsByModule(moduleId: string): Promise<ILesson[]> {
    return await lessonRepository.getLessonsByModule(moduleId);
  },

  async updateLesson(id: string, updateData: Partial<ILesson>): Promise<ILesson | null> {
    return await lessonRepository.updateLesson(id, updateData);
  },

  async deleteLesson(id: string): Promise<void> {
    await lessonRepository.deleteLesson(id);
  }
};