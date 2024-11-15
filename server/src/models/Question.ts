import mongoose, { Schema, Document } from 'mongoose';

// Question Types
type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

// Interface for a question
export interface IQuestion extends Document {
  text: string; // The question text
  type: QuestionType; // Type of question
  choices?: string[]; // Choices for multiple-choice questions
  correctAnswer: string; // The correct answer (for short-answer and multiple-choice)
  correctBool?: boolean; // The correct answer for true/false
}

const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['multiple-choice', 'true-false', 'short-answer'], required: true },
  choices: [{ type: String }], // Only used for multiple-choice questions
  correctAnswer: { type: String },
  correctBool: { type: Boolean } // Only used for true/false questions
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
