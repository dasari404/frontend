import axiosInstance from './axios';
import type { Guide, GuidePublicResponse, BookingResponse, TravelRecord, OnboardingStepRequest } from '../types';

export const getProfile = async (): Promise<Guide> => {
  const response = await axiosInstance.get('/guide/profile');
  return response.data;
};

export const saveOnboardingStep = async (
  step: number,
  fields: OnboardingStepRequest
): Promise<Guide> => {
  const response = await axiosInstance.put(`/guide/onboarding/step/${step}`, fields);
  return response.data;
};

export const getBookings = async (): Promise<BookingResponse[]> => {
  const response = await axiosInstance.get('/guide/bookings');
  return response.data;
};

export const getTravelHistory = async (): Promise<TravelRecord[]> => {
  const response = await axiosInstance.get('/guide/travel-history');
  return response.data;
};

export const listPublicGuides = async (filters?: {
  city?: string;
  language?: string;
  minRate?: number;
  maxRate?: number;
  minRating?: number;
  level?: string;
}): Promise<GuidePublicResponse[]> => {
  const response = await axiosInstance.get('/guide/public', { params: filters });
  return response.data;
};
