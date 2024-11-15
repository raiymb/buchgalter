import { Request, Response } from 'express';
import { articleService } from '../services/articleService';

export const articleController = {
  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.createArticle(req.body);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.getArticleById(req.params.id);
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
      } else {
        res.status(200).json(article);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleService.getAllArticles(req.query);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.updateArticle(req.params.id, req.body);
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
      } else {
        res.status(200).json(article);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      await articleService.deleteArticle(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
