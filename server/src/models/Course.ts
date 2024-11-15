// Updated Course Model
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IReview } from './Review';
import Module from './Module';
import Enrollment from './Enrollment';
import Certificate from './Certificate';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: IUser['_id'];
  modules: any[];
  price: number;
  reviews: IReview['_id'][];
  averageRating: number;
  visibility: 'public' | 'private'; // Course visibility control
  createdAt: Date;
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  price: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
}, { timestamps: true });

// Virtual for average rating calculation
CourseSchema.virtual('averageRating').get(function (this: ICourse) {
  if (!this.reviews || (this.reviews as IReview[]).length === 0) return 0;
  return (this.reviews as IReview[]).reduce((sum: number, review: IReview) => sum + review.rating, 0) / (this.reviews as IReview[]).length;
});

// Middleware for deleting related documents when a course is deleted
CourseSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const course = this as unknown as ICourse;
  try {
    await Module.deleteMany({ courseId: course._id });
    await Enrollment.deleteMany({ course: course._id });
    await Certificate.deleteMany({ course: course._id });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model<ICourse>('Course', CourseSchema);