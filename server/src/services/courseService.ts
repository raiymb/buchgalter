import { courseRepository } from '../repositories/courseRepository';
import { ICourse } from '../models/Course';
import { Types } from 'mongoose';

export const courseService = {
  async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    return await courseRepository.createCourse(courseData);
  },

  async getCourseById(id: string): Promise<ICourse | null> {
    return await courseRepository.getCourseById(id);
  },

  async getAllCourses(filters: any = {}): Promise<ICourse[]> {
    return await courseRepository.getAllCourses(filters);
  },

  async getCoursesByInstructor(instructorId: string): Promise<ICourse[]> {
    const objectId = new Types.ObjectId(instructorId);
    return await courseRepository.getCoursesByInstructor(objectId);
  },

  async updateCourse(id: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    return await courseRepository.updateCourse(id, updateData);
  },

  async deleteCourse(id: string): Promise<void> {
    await courseRepository.deleteCourse(id);
  },
  async getTotalCoursesCount(): Promise<number> {
    return await courseRepository.countTotalCourses();
  }
};