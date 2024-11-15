import mongoose, { Schema, Document } from 'mongoose';
import { IQuiz } from './Quiz';
import { IModule } from './Module';

export interface ILesson extends Document {
  title: string;
  content: string;
  videoUrl: string;
  lessonType: 'lecture' | 'video' | 'practical';
  submissionUrl: string;
  submissionStatus: 'submitted' | 'graded' | 'not-submitted';
  grade?: number; // Grade for practical lessons
  isGraded: boolean; // Indicates if the submission has been graded
  quiz?: IQuiz['_id'];
  module: IModule['_id'];
  orderIndex: number; // Sequence control for lessons
  createdAt: Date;
}

const LessonSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  videoUrl: { type: String },
  lessonType: { type: String, enum: ['lecture', 'video', 'practical'], required: true },
  submissionUrl: { type: String },
  submissionStatus: { type: String, enum: ['submitted', 'graded', 'not-submitted'], default: 'not-submitted' },
  grade: { type: Number },
  isGraded: { type: Boolean, default: false },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  module: { type: Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
  orderIndex: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ILesson>('Lesson', LessonSchema);