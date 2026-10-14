import axiosInstance from './axios';
import type { Review, ReviewResponse, CreateReviewRequest } from '../types';

export const createReview = async (data: CreateReviewRequest): Promise<Review> => {
  const response = await axiosInstance.post('/reviews', data);
  return response.data;
};

export const getGuideReviews = async (guideId: number): Promise<ReviewResponse[]> => {
  const response = await axiosInstance.get(`/reviews/guide/${guideId}`);
  return response.data;
};
