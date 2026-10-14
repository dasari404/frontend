import axiosInstance from './axios';
import type { 
  AdminDashboardResponse, 
  Customer, 
  Guide, 
  BookingResponse,
  VerifyGuideRequest,
  UpdateBookingStatusRequest 
} from '../types';

export const getDashboard = async (): Promise<AdminDashboardResponse> => {
  const response = await axiosInstance.get('/admin/dashboard');
  return response.data;
};

export const listCustomers = async (query?: string, page: number = 0): Promise<Customer[]> => {
  const response = await axiosInstance.get('/admin/customers', {
    params: { query, page, limit: 20 }
  });
  return response.data;
};

export const listGuides = async (
  query?: string, 
  status?: string, 
  page: number = 0
): Promise<Guide[]> => {
  const response = await axiosInstance.get('/admin/guides', {
    params: { query, status, page, limit: 20 }
  });
  return response.data;
};

export const verifyGuide = async (
  id: number, 
  action: 'approve' | 'reject', 
  adminNotes?: string
): Promise<Guide> => {
  const data: VerifyGuideRequest = { action, adminNotes };
  const response = await axiosInstance.put(`/admin/guides/${id}/verify`, data);
  return response.data;
};

export const listBookings = async (
  query?: string, 
  status?: string, 
  page: number = 0
): Promise<BookingResponse[]> => {
  const response = await axiosInstance.get('/admin/bookings', {
    params: { query, status, page, limit: 20 }
  });
  return response.data;
};

export const updateBookingStatus = async (
  id: number, 
  status: string
): Promise<BookingResponse> => {
  const data: UpdateBookingStatusRequest = { status };
  const response = await axiosInstance.put(`/admin/bookings/${id}/status`, data);
  return response.data;
};
