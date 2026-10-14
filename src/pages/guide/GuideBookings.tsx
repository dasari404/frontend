import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import BookingCard from '../../components/BookingCard';
import CompleteBookingModal from './CompleteBookingModal';
import * as guideApi from '../../api/guide';
import type { BookingResponse } from '../../types';

const GuideBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);

  const fetchBookings = async () => {
    try {
      const data = await guideApi.getBookings();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCompleteSuccess = () => {
    setSelectedBooking(null);
    fetchBookings();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No bookings yet. Wait for customers to book your services!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id}>
                  <BookingCard booking={booking} userRole="guide" />
                  {(['confirmed', 'pending'].includes(booking.status)) && (
                    <div className="mt-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Complete Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedBooking && (
        <CompleteBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onSuccess={handleCompleteSuccess}
        />
      )}
    </>
  );
};

export default GuideBookings;
