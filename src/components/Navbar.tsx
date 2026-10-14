import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to={`/${user.role}/dashboard`} className="text-xl font-bold">
              TravelSphere
            </Link>
            
            {user.role === 'customer' && (
              <>
                <Link to="/customer/guides" className="hover:text-blue-200">Browse Guides</Link>
                <Link to="/customer/bookings" className="hover:text-blue-200">My Bookings</Link>
              </>
            )}
            
            {user.role === 'guide' && (
              <>
                <Link to="/guide/bookings" className="hover:text-blue-200">My Bookings</Link>
                <Link to="/guide/profile" className="hover:text-blue-200">My Profile</Link>
              </>
            )}
            
            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <Link to="/admin/customers" className="hover:text-blue-200">Customers</Link>
                <Link to="/admin/guides" className="hover:text-blue-200">Guides</Link>
                <Link to="/admin/bookings" className="hover:text-blue-200">Bookings</Link>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
