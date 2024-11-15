import mongoose, { Schema, Document } from 'mongoose';
import { ILesson } from './Lesson';
import { ICourse } from './Course';
import { IQuiz } from './Quiz';

export interface IModule extends Document {
  title: string;
  description: string;
  courseId: ICourse['_id'];
  lessons: ILesson['_id'][];
  quiz?: IQuiz['_id'];
  prerequisites: IModule['_id'][];
  orderIndex: number; // Sequence control for modules
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  orderIndex: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IModule>('Module', ModuleSchema);