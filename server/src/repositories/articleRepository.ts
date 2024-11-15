import Article, { IArticle } from '../models/Article';  // Import the Article model and interface
import { Types } from 'mongoose';  // For dealing with ObjectId types

export const articleRepository = {
  // Create a new article
  async createArticle(articleData: Partial<IArticle>): Promise<IArticle> {
    const article = new Article(articleData);
    return await article.save();
  },

  // Get an article by ID
  async getArticleById(id: string): Promise<IArticle | null> {
    return await Article.findById(id).populate('author', 'name email').exec();  // Populate the author's name and email
  },

  // Get all articles with optional filters
  async getArticles(filters: any = {}): Promise<IArticle[]> {
    return await Article.find(filters).populate('author', 'name email').exec();
  },

  // Update an article by ID
  async updateArticle(id: string, updateData: Partial<IArticle>): Promise<IArticle | null> {
    return await Article.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete an article by ID
  async deleteArticle(id: string): Promise<void> {
    await Article.findByIdAndDelete(id).exec();
  },

  // Add related articles to an existing article
  async addRelatedArticles(articleId: string, relatedArticles: Types.ObjectId[]): Promise<IArticle | null> {
    return await Article.findByIdAndUpdate(articleId, { $push: { relatedArticles: { $each: relatedArticles } } }, { new: true }).exec();
  }
};
