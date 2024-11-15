import Course, { ICourse } from '../models/Course';
import { Types } from 'mongoose';  // For handling ObjectId

export const courseRepository = {
  // Create a new course
  async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    const course = new Course(courseData);
    return await course.save();
  },

  // Get a course by ID
  async getCourseById(id: string): Promise<ICourse | null> {
    return await Course.findById(id).populate('instructor', 'name email').exec();
  },

  // Get all courses with optional filters
  async getAllCourses(filters: any = {}): Promise<ICourse[]> {
    return await Course.find(filters).populate('instructor', 'name email').exec();
  },

  // Get all courses created by a specific instructor
  async getCoursesByInstructor(instructorId: Types.ObjectId): Promise<ICourse[]> {
    return await Course.find({ instructor: instructorId }).populate('instructor', 'name email').exec();
  },
  

  // Update a course by ID
  async updateCourse(id: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    return await Course.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a course by ID
  async deleteCourse(id: string): Promise<void> {
    await Course.findByIdAndDelete(id).exec();
  },
  async countTotalCourses(): Promise<number> {
    return await Course.countDocuments().exec();
  }
};
