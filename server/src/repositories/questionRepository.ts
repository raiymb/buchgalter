// repositories/questionRepository.ts
import Question, { IQuestion } from '../models/Question';

export const questionRepository = {
  // Create a new question
  async createQuestion(questionData: Partial<IQuestion>): Promise<IQuestion> {
    const question = new Question(questionData);
    return await question.save();
  },

  // Get a question by ID
  async getQuestionById(id: string): Promise<IQuestion | null> {
    return await Question.findById(id).exec();
  },

  // Get all questions with optional filters
  async getAllQuestions(filters: any = {}): Promise<IQuestion[]> {
    return await Question.find(filters).exec();
  },

  // Update a question by ID
  async updateQuestion(id: string, updateData: Partial<IQuestion>): Promise<IQuestion | null> {
    return await Question.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a question by ID
  async deleteQuestion(id: string): Promise<void> {
    await Question.findByIdAndDelete(id).exec();
  }
};
