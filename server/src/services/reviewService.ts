import { reviewRepository } from '../repositories/reviewRepository';
import { IReview } from '../models/Review';

export const reviewService = {
  async createReview(reviewData: Partial<IReview>): Promise<IReview> {
    return await reviewRepository.createReview(reviewData);
  },

  async getReviewById(id: string): Promise<IReview | null> {
    return await reviewRepository.getReviewById(id);
  },

  async getReviewsByCourse(courseId: string): Promise<IReview[]> {
    return await reviewRepository.getReviewsByCourse(courseId);
  },

  async updateReview(id: string, updateData: Partial<IReview>): Promise<IReview | null> {
    return await reviewRepository.updateReview(id, updateData);
  },

  async deleteReview(id: string): Promise<void> {
    await reviewRepository.deleteReview(id);
  },
  async getReportedContentCount(): Promise<number> {
    return await reviewRepository.countReportedContent();
  },
  async flagReview(id: string): Promise<IReview | null> {
    return await reviewRepository.updateReview(id, { isReported: true });
  }
};