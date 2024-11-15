import { quizAttemptRepository } from '../repositories/quizAttemptRepository';
import { IQuizAttempt } from '../models/QuizAttempt';

export const quizAttemptService = {
  async createQuizAttempt(quizAttemptData: Partial<IQuizAttempt>): Promise<IQuizAttempt> {
    return await quizAttemptRepository.createQuizAttempt(quizAttemptData);
  },

  async getQuizAttemptById(id: string): Promise<IQuizAttempt | null> {
    return await quizAttemptRepository.getQuizAttemptById(id);
  },

  async getQuizAttemptsByStudent(studentId: string): Promise<IQuizAttempt[]> {
    return await quizAttemptRepository.getQuizAttemptsByStudent(studentId);
  },

  async getQuizAttemptsByQuiz(quizId: string): Promise<IQuizAttempt[]> {
    return await quizAttemptRepository.getQuizAttemptsByQuiz(quizId);
  }
};