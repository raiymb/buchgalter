import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IAuditLog extends Document {
  adminId: IUser['_id'];
  action: string;
  details: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);