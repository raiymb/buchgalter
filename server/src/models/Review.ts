import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models/User';
import { ICourse } from '../models/Course';

export interface IReview extends Document {
  course: ICourse['_id'];
  student: IUser['_id'];
  rating: number; // 1 to 5
  comment: string;
  isReported: boolean; // Indicates if the review is flagged for moderation
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },  // Added index for better query performance
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },  // Added index for better query performance
    rating: { type: Number, required: true, min: 1, max: 5 },  // Validation for rating between 1 and 5
    comment: { type: String },
    isReported: { type: Boolean, default: false },  // Default value for reported status
  }, { timestamps: true });
  
export default mongoose.model<IReview>('Review', ReviewSchema);