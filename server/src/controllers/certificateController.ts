import { Request, Response } from 'express';
import { certificateService } from '../services/certificateService';

export const certificateController = {
  async createCertificate(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await certificateService.createCertificate(req.body);
      res.status(201).json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCertificateById(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await certificateService.getCertificateById(req.params.id);
      if (!certificate) {
        res.status(404).json({ message: 'Certificate not found' });
      } else {
        res.status(200).json(certificate);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCertificatesByStudent(req: Request, res: Response): Promise<void> {
    try {
      const certificates = await certificateService.getCertificatesByStudent(req.params.studentId);
      res.status(200).json(certificates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCertificatesByCourse(req: Request, res: Response): Promise<void> {
    try {
      const certificates = await certificateService.getCertificatesByCourse(req.params.courseId);
      res.status(200).json(certificates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};