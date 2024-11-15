import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IQuiz } from './Quiz';
import { IQuestion } from './Question';

export interface IQuizAttempt extends Document {
  quiz: IQuiz['_id'];
  student: IUser['_id'];
  attemptNumber: number; // Track attempt number
  answers: {
    question: IQuestion['_id'];
    answer: string;
    isCorrect: boolean;
  }[];
  score: number;
  timeSpent: number; // Time spent on the quiz in seconds
  completedAt: Date;
}

const QuizAttemptSchema: Schema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attemptNumber: { type: Number, required: true },
  answers: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
      answer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  score: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);