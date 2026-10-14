import axiosInstance from './axios';
import type { BookingResponse, CreateBookingRequest, CompleteBookingRequest } from '../types';

export const createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
  const response = await axiosInstance.post('/bookings', data);
  return response.data;
};

export const getBookingByToken = async (token: string): Promise<BookingResponse> => {
  const response = await axiosInstance.get(`/bookings/${token}`);
  return response.data;
};

export const completeBooking = async (
  token: string,
  data: CompleteBookingRequest
): Promise<{ travelToken: string }> => {
  const response = await axiosInstance.post(`/bookings/${token}/complete`, data);
  return response.data;
};
