import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as customerApi from '../../api/customer';
import Navbar from '../../components/Navbar';

const CustomerDashboard: React.FC = () => {
  const { user, customer } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await customerApi.getBookings();
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

  const upcomingBookings = bookings.filter(b => ['pending', 'confirmed'].includes(b.status));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Welcome, {customer?.fullName || user?.email}!</h1>
          
          {!customer?.onboardingComplete && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                Complete your onboarding to unlock all features.{' '}
                <Link to="/customer/onboarding" className="font-semibold underline">
                  Continue Onboarding
                </Link>
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Upcoming Trips</h3>
              <p className="text-3xl font-bold text-green-600">{upcomingBookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm mb-2">Account Status</h3>
              <p className="text-lg font-semibold text-gray-800">
                {customer?.onboardingComplete ? 'Active' : 'Incomplete'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/customer/guides"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Browse Guides</h3>
              <p className="text-gray-600">Find and book expert local guides</p>
            </Link>
            
            <Link
              to="/customer/bookings"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
              <p className="text-gray-600">View and manage your bookings</p>
            </Link>
            
            <Link
              to="/customer/profile"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">My Profile</h3>
              <p className="text-gray-600">Update your preferences</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
