import axiosInstance from './axios';
import type { AuthResponse, UserProfileResponse } from '../types';

export const registerCustomer = async (data: {
  email: string;
  password: string;
  fullName: string;
  mobile: string;
}): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register/customer', data);
  return response.data;
};

export const registerGuide = async (data: {
  email: string;
  password: string;
  fullName: string;
  mobile: string;
  city: string;
  state: string;
}): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register/guide', data);
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

export const getMe = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
