import { enrollmentRepository } from '../repositories/enrollmentRepository';
import { IEnrollment } from '../models/Enrollment';

export const enrollmentService = {
  async createEnrollment(enrollmentData: Partial<IEnrollment>): Promise<IEnrollment> {
    return await enrollmentRepository.createEnrollment(enrollmentData);
  },

  async getEnrollmentById(id: string): Promise<IEnrollment | null> {
    return await enrollmentRepository.getEnrollmentById(id);
  },

  async getEnrollmentsByStudent(studentId: string): Promise<IEnrollment[]> {
    return await enrollmentRepository.getEnrollmentsByStudent(studentId);
  },

  async updateProgress(id: string, progressData: Partial<IEnrollment>): Promise<IEnrollment | null> {
    return await enrollmentRepository.updateProgress(id, progressData);
  },

  async getEnrollmentsByCourse(courseId: string): Promise<IEnrollment[]> {
    return await enrollmentRepository.getEnrollmentsByCourse(courseId);
  }
};