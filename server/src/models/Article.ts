import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';

export interface IArticle extends Document {
  title: string;
  content: string;
  author: IUser['_id'];  // Reference to the user who wrote the article
  media?: { type: 'image' | 'video', url: string }[];  // Optional array of media (images or videos)
  tags?: string[];  // Optional tags for article categorization or filtering
  relatedArticles?: IArticle['_id'][];  // Optional references to related articles
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  media: [
    {
      type: { type: String, enum: ['image', 'video'], required: true },
      url: { type: String, required: true },
    }
  ],  // Optional array of media objects
  tags: [{ type: String }],  // Optional array of tags
  relatedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],  // Optional references to other articles
}, { timestamps: true });

export default mongoose.model<IArticle>('Article', ArticleSchema);
