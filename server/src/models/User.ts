import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IEnrollment } from '../models/Enrollment'; // Import Enrollment for course tracking

export interface IUser extends Document {
  _id: Types.ObjectId;  // Unique ID for each user
  name: string;  // Full name of the user
  email: string;  // User's email address (must be unique)
  password: string;  // Hashed password
  role: 'student' | 'instructor' | 'admin';  // Role-based access control
  enrolledCourses: IEnrollment['_id'][];  // List of enrolled courses (for students)
  lastLogin: Date;  // Track last login time
  createdAt: Date;  // Date of account creation
  comparePassword(candidatePassword: string): Promise<boolean>;  // Method for password comparison
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },  // Added index for better query performance
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Enrollment' }],
    lastLogin: { type: Date, default: Date.now },
  }, { timestamps: true });  // Automatically add createdAt and updatedAt
  

// Hash the user's password before saving it to the database
UserSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt for hashing
    const hashedPassword = await bcrypt.hash(user.password, salt);  // Hash the password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare a given password with the stored hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
