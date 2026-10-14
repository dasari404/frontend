import axiosInstance from './axios';
import type { Customer, BookingResponse, TravelRecord, OnboardingStepRequest } from '../types';

export const getProfile = async (): Promise<Customer> => {
  const response = await axiosInstance.get('/customer/profile');
  return response.data;
};

export const saveOnboardingStep = async (
  step: number,
  fields: OnboardingStepRequest
): Promise<Customer> => {
  const response = await axiosInstance.put(`/customer/onboarding/step/${step}`, fields);
  return response.data;
};

export const getBookings = async (): Promise<BookingResponse[]> => {
  const response = await axiosInstance.get('/customer/bookings');
  return response.data;
};

export const getTravelHistory = async (): Promise<TravelRecord[]> => {
  const response = await axiosInstance.get('/customer/travel-history');
  return response.data;
};
