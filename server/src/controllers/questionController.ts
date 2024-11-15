import { Request, Response } from 'express';
import { questionRepository } from '../repositories/questionRepository';
import { IQuestion } from '../models/Question';

export const questionController = {
  async createQuestion(req: Request, res: Response): Promise<void> {
    try {
      const question = await questionRepository.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuestionById(req: Request, res: Response): Promise<void> {
    try {
      const question = await questionRepository.getQuestionById(req.params.id);
      if (!question) {
        res.status(404).json({ message: 'Question not found' });
      } else {
        res.status(200).json(question);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllQuestions(req: Request, res: Response): Promise<void> {
    try {
      const questions = await questionRepository.getAllQuestions(req.query);
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateQuestion(req: Request, res: Response): Promise<void> {
    try {
      const question = await questionRepository.updateQuestion(req.params.id, req.body);
      if (!question) {
        res.status(404).json({ message: 'Question not found' });
      } else {
        res.status(200).json(question);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
      await questionRepository.deleteQuestion(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
