import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollmentService';

export const enrollmentController = {
  async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await enrollmentService.createEnrollment(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getEnrollmentById(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await enrollmentService.getEnrollmentById(req.params.id);
      if (!enrollment) {
        res.status(404).json({ message: 'Enrollment not found' });
      } else {
        res.status(200).json(enrollment);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getEnrollmentsByStudent(req: Request, res: Response): Promise<void> {
    try {
      const enrollments = await enrollmentService.getEnrollmentsByStudent(req.params.studentId);
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProgress(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await enrollmentService.updateProgress(req.params.id, req.body);
      if (!enrollment) {
        res.status(404).json({ message: 'Enrollment not found' });
      } else {
        res.status(200).json(enrollment);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getEnrollmentsByCourse(req: Request, res: Response): Promise<void> {
    try {
      const enrollments = await enrollmentService.getEnrollmentsByCourse(req.params.courseId);
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};