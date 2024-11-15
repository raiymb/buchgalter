import { certificateRepository } from '../repositories/certificateRepository';
import { ICertificate } from '../models/Certificate';

export const certificateService = {
  async createCertificate(certificateData: Partial<ICertificate>): Promise<ICertificate> {
    return await certificateRepository.createCertificate(certificateData);
  },

  async getCertificateById(id: string): Promise<ICertificate | null> {
    return await certificateRepository.getCertificateById(id);
  },

  async getCertificatesByStudent(studentId: string): Promise<ICertificate[]> {
    return await certificateRepository.getCertificatesByStudent(studentId);
  },

  async getCertificatesByCourse(courseId: string): Promise<ICertificate[]> {
    return await certificateRepository.getCertificatesByCourse(courseId);
  }
};