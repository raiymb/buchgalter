// /repositories/enrollmentRepository.ts
import Enrollment, { IEnrollment } from '../models/Enrollment';

export const enrollmentRepository = {
  // Create a new enrollment
  async createEnrollment(enrollmentData: Partial<IEnrollment>): Promise<IEnrollment> {
    const enrollment = new Enrollment(enrollmentData);
    return await enrollment.save();
  },

  // Get an enrollment by ID
  async getEnrollmentById(id: string): Promise<IEnrollment | null> {
    return await Enrollment.findById(id)
      .populate('student', 'name email')
      .populate('course', 'title instructor')
      .exec();
  },

  // Get all enrollments for a specific student
  async getEnrollmentsByStudent(studentId: string): Promise<IEnrollment[]> {
    return await Enrollment.find({ student: studentId })
      .populate('course', 'title instructor')
      .exec();
  },

  // Update the progress of an enrollment
  async updateProgress(id: string, progressData: Partial<IEnrollment>): Promise<IEnrollment | null> {
    return await Enrollment.findByIdAndUpdate(id, progressData, { new: true }).exec();
  },

  // Get all enrollments for a specific course
  async getEnrollmentsByCourse(courseId: string): Promise<IEnrollment[]> {
    return await Enrollment.find({ course: courseId })
      .populate('student', 'name email')
      .exec();
  }
};
