import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { ICourse } from './Course';
import { IModule } from './Module';
import { ILesson } from './Lesson';

export interface IEnrollment extends Document {
  student: IUser['_id'];
  course: ICourse['_id'];
  progress: {
    module: IModule['_id'];
    lessons: { lesson: ILesson['_id']; completed: boolean }[];
  }[]; // Detailed progress tracking for each module and lesson
  currentModule: IModule['_id'];
  completedModules: IModule['_id'][];
  completedLessons: ILesson['_id'][];
  isCertified: boolean; // Indicates if the student has received a certificate
  completedAt: Date | null;
  enrolledAt: Date;
  startedAt: Date | null; // When the student started the course
}

const EnrollmentSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  progress: [
    {
      module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
      lessons: [
        {
          lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
          completed: { type: Boolean, default: false },
        },
      ],
    },
  ],
  currentModule: { type: Schema.Types.ObjectId, ref: 'Module' },
  completedModules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  isCertified: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  startedAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);