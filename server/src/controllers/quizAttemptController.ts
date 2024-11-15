import { Request, Response } from 'express';
import { quizAttemptService } from '../services/quizAttemptService';

export const quizAttemptController = {
  async createQuizAttempt(req: Request, res: Response): Promise<void> {
    try {
      const quizAttempt = await quizAttemptService.createQuizAttempt(req.body);
      res.status(201).json(quizAttempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuizAttemptById(req: Request, res: Response): Promise<void> {
    try {
      const quizAttempt = await quizAttemptService.getQuizAttemptById(req.params.id);
      if (!quizAttempt) {
        res.status(404).json({ message: 'Quiz Attempt not found' });
      } else {
        res.status(200).json(quizAttempt);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuizAttemptsByStudent(req: Request, res: Response): Promise<void> {
    try {
      const quizAttempts = await quizAttemptService.getQuizAttemptsByStudent(req.params.studentId);
      res.status(200).json(quizAttempts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuizAttemptsByQuiz(req: Request, res: Response): Promise<void> {
    try {
      const quizAttempts = await quizAttemptService.getQuizAttemptsByQuiz(req.params.quizId);
      res.status(200).json(quizAttempts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};