// repositories/quizAttemptRepository.ts
import QuizAttempt, { IQuizAttempt } from '../models/QuizAttempt';

export const quizAttemptRepository = {
  // Create a new quiz attempt
  async createQuizAttempt(quizAttemptData: Partial<IQuizAttempt>): Promise<IQuizAttempt> {
    const quizAttempt = new QuizAttempt(quizAttemptData);
    return await quizAttempt.save();
  },

  // Get a quiz attempt by ID
  async getQuizAttemptById(id: string): Promise<IQuizAttempt | null> {
    return await QuizAttempt.findById(id)
      .populate('quiz', 'title')
      .populate('student', 'name email')
      .exec();
  },

  // Get all quiz attempts for a specific student
  async getQuizAttemptsByStudent(studentId: string): Promise<IQuizAttempt[]> {
    return await QuizAttempt.find({ student: studentId }).populate('quiz', 'title').exec();
  },

  // Get all quiz attempts for a specific quiz
  async getQuizAttemptsByQuiz(quizId: string): Promise<IQuizAttempt[]> {
    return await QuizAttempt.find({ quiz: quizId }).populate('student', 'name email').exec();
  }
};
