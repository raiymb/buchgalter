// repositories/certificateRepository.ts
import Certificate, { ICertificate } from '../models/Certificate';

export const certificateRepository = {
  // Create a new certificate
  async createCertificate(certificateData: Partial<ICertificate>): Promise<ICertificate> {
    const certificate = new Certificate(certificateData);
    return await certificate.save();
  },

  // Get a certificate by ID
  async getCertificateById(id: string): Promise<ICertificate | null> {
    return await Certificate.findById(id).populate('student', 'name email').populate('course', 'title').exec();
  },

  // Get all certificates for a specific student
  async getCertificatesByStudent(studentId: string): Promise<ICertificate[]> {
    return await Certificate.find({ student: studentId }).populate('course', 'title').exec();
  },

  // Get all certificates for a specific course
  async getCertificatesByCourse(courseId: string): Promise<ICertificate[]> {
    return await Certificate.find({ course: courseId }).populate('student', 'name email').exec();
  }
};
