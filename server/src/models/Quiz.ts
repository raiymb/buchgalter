import mongoose, { Schema, Document } from 'mongoose';
import { IQuestion } from '../models/Question';
import { ILesson } from '../models/Lesson'; 
import { IModule } from '../models/Module'; 

// Quiz Interface
export interface IQuiz extends Document {
  title: string;
  questions: IQuestion['_id'][]; // List of questions in the quiz
  relatedLesson?: ILesson['_id']; // Optional reference to a lesson
  relatedModule?: IModule['_id']; // Optional reference to a module
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
  relatedLesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: false },
  relatedModule: { type: Schema.Types.ObjectId, ref: 'Module', required: false }
}, { timestamps: true });

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
