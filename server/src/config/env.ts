import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Now you can access the variables from process.env
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
export const JWT_SECRET = process.env.JWT_SECRET || 'mysecretjwt';
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;