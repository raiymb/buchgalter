import { articleRepository } from '../repositories/articleRepository';
import { IArticle } from '../models/Article';
import { Types } from 'mongoose';

export const articleService = {
  async createArticle(articleData: Partial<IArticle>): Promise<IArticle> {
    return await articleRepository.createArticle(articleData);
  },

  async getArticleById(id: string): Promise<IArticle | null> {
    return await articleRepository.getArticleById(id);
  },

  async getAllArticles(filters: any = {}): Promise<IArticle[]> {
    return await articleRepository.getArticles(filters);
  },

  async updateArticle(id: string, updateData: Partial<IArticle>): Promise<IArticle | null> {
    return await articleRepository.updateArticle(id, updateData);
  },

  async deleteArticle(id: string): Promise<void> {
    await articleRepository.deleteArticle(id);
  },

  async addRelatedArticles(articleId: string, relatedArticles: Types.ObjectId[]): Promise<IArticle | null> {
    return await articleRepository.addRelatedArticles(articleId, relatedArticles);
  }
};