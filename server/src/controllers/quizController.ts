import { Request, Response } from 'express';
import { quizService } from '../services/quizService';

export const quizController = {
  async createQuiz(req: Request, res: Response): Promise<void> {
    try {
      const quiz = await quizService.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuizById(req: Request, res: Response): Promise<void> {
    try {
      const quiz = await quizService.getQuizById(req.params.id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.status(200).json(quiz);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuizzesByModule(req: Request, res: Response): Promise<void> {
    try {
      const quizzes = await quizService.getQuizzesByModule(req.params.moduleId);
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateQuiz(req: Request, res: Response): Promise<void> {
    try {
      const quiz = await quizService.updateQuiz(req.params.id, req.body);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.status(200).json(quiz);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteQuiz(req: Request, res: Response): Promise<void> {
    try {
      await quizService.deleteQuiz(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};