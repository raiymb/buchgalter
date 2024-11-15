import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { ICourse } from './Course';

export interface ICertificate extends Document {
  student: IUser['_id'];
  course: ICourse['_id'];
  certificateURL: string;
  issuedAt: Date;
}

const CertificateSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateURL: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICertificate>('Certificate', CertificateSchema);