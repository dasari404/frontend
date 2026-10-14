import React, { useState } from 'react';
import * as bookingApi from '../../api/booking';
import type { BookingResponse } from '../../types';

interface CompleteBookingModalProps {
  booking: BookingResponse;
  onClose: () => void;
  onSuccess: () => void;
}

const CompleteBookingModal: React.FC<CompleteBookingModalProps> = ({ booking, onClose, onSuccess }) => {
  const [placesVisited, setPlacesVisited] = useState<string[]>(['']);
  const [guideNotes, setGuideNotes] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addPlace = () => {
    setPlacesVisited([...placesVisited, '']);
  };

  const updatePlace = (index: number, value: string) => {
    const updated = [...placesVisited];
    updated[index] = value;
    setPlacesVisited(updated);
  };

  const removePlace = (index: number) => {
    setPlacesVisited(placesVisited.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const filteredPlaces = placesVisited.filter(p => p.trim() !== '');
      const response = await bookingApi.completeBooking(booking.bookingToken, {
        placesVisited: filteredPlaces,
        guideNotes,
        customerNotes,
      });
      setSuccess(`Booking completed! Travel Token: ${response.travelToken}`);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to complete booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Complete Booking</h2>
        
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-600">Booking: {booking.bookingToken}</p>
          <p className="text-sm text-gray-600">Customer: {booking.customerName}</p>
          <p className="text-sm text-gray-600">Destination: {booking.destination}</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Places Visited</label>
            {placesVisited.map((place, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={place}
                  onChange={(e) => updatePlace(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={`Place ${index + 1}`}
                />
                {placesVisited.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlace(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPlace}
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Place
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guide Notes</label>
            <textarea
              value={guideNotes}
              onChange={(e) => setGuideNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Your notes about the trip (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Notes</label>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Notes from the customer (optional)"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Completing...' : 'Complete Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteBookingModal;
