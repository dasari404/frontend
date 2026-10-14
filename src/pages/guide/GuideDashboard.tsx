import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as guideApi from '../../api/guide';
import Navbar from '../../components/Navbar';

const GuideDashboard: React.FC = () => {
  const { guide } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await guideApi.getBookings();
        setBookings(bookingsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const getStatusBanner = () => {
    if (guide?.verificationStatus === 'pending') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-semibold">
            ⏳ Your account is pending admin verification. You'll be notified once approved.
          </p>
        </div>
      );
    }
    if (guide?.verificationStatus === 'rejected') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-semibold">❌ Your account was not approved.</p>
          {guide.adminNotes && (
            <p className="text-red-700 mt-2">Admin notes: {guide.adminNotes}</p>
          )}
        </div>
      );
    }
    if (guide?.verificationStatus === 'approved') {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">✓ Your account is verified and active!</p>
        </div>
      );
    }
    return null;
  };

  const totalEarnings = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);
  const upcomingBookings = bookings.filter(b => ['confirmed', 'pending'].includes(b.status));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Guide Dashboard</h1>
          
          {getStatusBanner()}
          
          {!guide?.onboardingComplete && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                Complete your onboarding to start receiving bookings.{' '}
                <Link to="/guide/onboarding" className="font-semibold underline">
                  Continue Onboarding
                </Link>
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-green-600">₹{totalEarnings}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Rating</h3>
              <p className="text-3xl font-bold text-yellow-600">{guide?.rating?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Reviews</h3>
              <p className="text-3xl font-bold text-purple-600">{guide?.reviewCount || 0}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
            {upcomingBookings.length === 0 ? (
              <p className="text-gray-600">No upcoming bookings</p>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold">{booking.destination}</p>
                      <p className="text-sm text-gray-600">{booking.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{new Date(booking.startDate).toLocaleDateString()}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{booking.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/guide/bookings"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
              <p className="text-gray-600">View and manage all bookings</p>
            </Link>
            
            <Link
              to="/guide/profile"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">My Profile</h3>
              <p className="text-gray-600">Update your profile information</p>
            </Link>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
              <p className="text-gray-600">Level: {guide?.guideLevel || 'Starter'}</p>
              <p className="text-gray-600">Daily Rate: ₹{guide?.dailyRate || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideDashboard;
