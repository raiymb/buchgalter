// repositories/reviewRepository.ts
import Review, { IReview } from '../models/Review';

export const reviewRepository = {
  // Create a new review
  async createReview(reviewData: Partial<IReview>): Promise<IReview> {
    const review = new Review(reviewData);
    return await review.save();
  },

  // Get a review by ID
  async getReviewById(id: string): Promise<IReview | null> {
    return await Review.findById(id)
      .populate('student', 'name email')
      .populate('course', 'title')
      .exec();
  },

  // Get all reviews for a specific course
  async getReviewsByCourse(courseId: string): Promise<IReview[]> {
    return await Review.find({ course: courseId }).populate('student', 'name email').exec();
  },

  // Update a review by ID
  async updateReview(id: string, updateData: Partial<IReview>): Promise<IReview | null> {
    return await Review.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },

  // Delete a review by ID
  async deleteReview(id: string): Promise<void> {
    await Review.findByIdAndDelete(id).exec();
  },
  async countReportedContent(): Promise<number> {
    return await Review.countDocuments({ isReported: true }).exec();
  }
};
