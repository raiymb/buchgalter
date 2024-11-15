import { Request, Response } from 'express';
import { reviewService } from '../services/reviewService';

export const reviewController = {
  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const review = await reviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReviewById(req: Request, res: Response): Promise<void> {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReviewsByCourse(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await reviewService.getReviewsByCourse(req.params.courseId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const review = await reviewService.updateReview(req.params.id, req.body);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      await reviewService.deleteReview(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};