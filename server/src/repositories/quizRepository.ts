import Quiz, { IQuiz } from '../models/Quiz';
import { Types } from 'mongoose';

export const quizRepository = {
  // Create a new quiz
  async createQuiz(quizData: Partial<IQuiz>): Promise<IQuiz> {
    const quiz = new Quiz(quizData);
    return await quiz.save();
  },

  // Get a quiz by ID
  async getQuizById(id: string): Promise<IQuiz | null> {
    return await Quiz.findById(id).populate('questions relatedLesson relatedModule').exec();
  },

  // Get all quizzes for a specific module
  async getQuizzesByModule(moduleId: string): Promise<IQuiz[]> {
    return await Quiz.find({ relatedModule: moduleId }).populate('questions').exec();
  },

  // Update a quiz by ID
  async updateQuiz(id: string, updateData: Partial<IQuiz>): Promise<IQuiz | null> {
    return await Quiz.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a quiz by ID
  async deleteQuiz(id: string): Promise<void> {
    await Quiz.findByIdAndDelete(id).exec();
  }
};
