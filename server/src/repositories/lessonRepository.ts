import Lesson, { ILesson } from '../models/Lesson';
import { Types } from 'mongoose';

export const lessonRepository = {
  // Create a new lesson
  async createLesson(lessonData: Partial<ILesson>): Promise<ILesson> {
    const lesson = new Lesson(lessonData);
    return await lesson.save();
  },

  // Get a lesson by ID
  async getLessonById(id: string): Promise<ILesson | null> {
    return await Lesson.findById(id).populate('module quiz').exec();
  },

  // Get all lessons for a specific module
  async getLessonsByModule(moduleId: string): Promise<ILesson[]> {
    return await Lesson.find({ module: moduleId }).populate('quiz').exec();
  },

  // Update a lesson by ID
  async updateLesson(id: string, updateData: Partial<ILesson>): Promise<ILesson | null> {
    return await Lesson.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a lesson by ID
  async deleteLesson(id: string): Promise<void> {
    await Lesson.findByIdAndDelete(id).exec();
  }
};