import { quizRepository } from '../repositories/quizRepository';
import { IQuiz } from '../models/Quiz';

export const quizService = {
  async createQuiz(quizData: Partial<IQuiz>): Promise<IQuiz> {
    return await quizRepository.createQuiz(quizData);
  },

  async getQuizById(id: string): Promise<IQuiz | null> {
    return await quizRepository.getQuizById(id);
  },

  async getQuizzesByModule(moduleId: string): Promise<IQuiz[]> {
    return await quizRepository.getQuizzesByModule(moduleId);
  },

  async updateQuiz(id: string, updateData: Partial<IQuiz>): Promise<IQuiz | null> {
    return await quizRepository.updateQuiz(id, updateData);
  },

  async deleteQuiz(id: string): Promise<void> {
    await quizRepository.deleteQuiz(id);
  }
};