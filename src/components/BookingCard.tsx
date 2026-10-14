import React from 'react';
import type { BookingResponse } from '../types';

interface BookingCardProps {
  booking: BookingResponse;
  userRole: 'customer' | 'guide' | 'admin';
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, userRole }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.destination}</h3>
          <p className="text-sm text-gray-600">Token: {booking.bookingToken}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">
            {userRole === 'customer' ? 'Guide' : 'Customer'}
          </p>
          <p className="font-medium">
            {userRole === 'customer' ? booking.guideName : booking.customerName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dates</p>
          <p className="font-medium">
            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">People</p>
          <p className="font-medium">{booking.people}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Amount</p>
          <p className="font-medium text-lg">₹{booking.amount}</p>
        </div>
      </div>
      
      {booking.meetingPoint && (
        <div className="mb-2">
          <p className="text-sm text-gray-600">Meeting Point</p>
          <p className="text-sm">{booking.meetingPoint}</p>
        </div>
      )}
      
      {booking.specialRequests && (
        <div>
          <p className="text-sm text-gray-600">Special Requests</p>
          <p className="text-sm">{booking.specialRequests}</p>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
