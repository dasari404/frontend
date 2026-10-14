import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth pages
import Login from './pages/auth/Login';
import RegisterCustomer from './pages/auth/RegisterCustomer';
import RegisterGuide from './pages/auth/RegisterGuide';

// Customer pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOnboarding from './pages/customer/CustomerOnboarding';
import BrowseGuides from './pages/customer/BrowseGuides';
import GuideDetails from './pages/customer/GuideDetails';
import CustomerBookings from './pages/customer/CustomerBookings';
import WriteReview from './pages/customer/WriteReview';

// Guide pages
import GuideDashboard from './pages/guide/GuideDashboard';
import GuideOnboarding from './pages/guide/GuideOnboarding';
import GuideBookings from './pages/guide/GuideBookings';
import GuideProfile from './pages/guide/GuideProfile';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminGuides from './pages/admin/AdminGuides';
import AdminBookings from './pages/admin/AdminBookings';

const RootRedirect: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'customer':
      return <Navigate to="/customer/dashboard" replace />;
    case 'guide':
      return <Navigate to="/guide/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/guide" element={<RegisterGuide />} />

        {/* Customer routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/onboarding"
          element={
            <ProtectedRoute role="customer">
              <CustomerOnboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/guides"
          element={
            <ProtectedRoute role="customer">
              <BrowseGuides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/guides/:id"
          element={
            <ProtectedRoute role="customer">
              <GuideDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute role="customer">
              <CustomerBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/write-review/:bookingId"
          element={
            <ProtectedRoute role="customer">
              <WriteReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Guide routes */}
        <Route
          path="/guide/dashboard"
          element={
            <ProtectedRoute role="guide">
              <GuideDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide/onboarding"
          element={
            <ProtectedRoute role="guide">
              <GuideOnboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide/bookings"
          element={
            <ProtectedRoute role="guide">
              <GuideBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide/profile"
          element={
            <ProtectedRoute role="guide">
              <GuideProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute role="admin">
              <AdminCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/guides"
          element={
            <ProtectedRoute role="admin">
              <AdminGuides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute role="admin">
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
