import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import * as guideApi from '../../api/guide';
import type { Guide } from '../../types';

const GuideProfile: React.FC = () => {
  const { guide: authGuide } = useAuth();
  const [guide, setGuide] = useState<Guide | null>(authGuide);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await guideApi.getProfile();
        setGuide(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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

  if (!guide) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Profile not found</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {guide.avatarUrl ? (
                  <img src={guide.avatarUrl} alt={guide.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl text-gray-500">{guide.fullName.charAt(0)}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{guide.fullName}</h1>
                <p className="text-gray-600 mb-2">{guide.city}, {guide.state}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                  {guide.guideLevel || 'Starter'}
                </span>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹{guide.dailyRate || 0}/day</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Guide Token</h3>
                <p className="text-gray-900">{guide.guideToken}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Mobile</h3>
                <p className="text-gray-900">{guide.mobile}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Experience</h3>
                <p className="text-gray-900">{guide.experienceYears || 0} years</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Languages</h3>
                <p className="text-gray-900">{guide.languages || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Rating</h3>
                <p className="text-gray-900">{guide.rating?.toFixed(1) || '0.0'} ({guide.reviewCount} reviews)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Verification Status</h3>
                <p className="text-gray-900 capitalize">{guide.verificationStatus}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Bio</h3>
              <p className="text-gray-700">{guide.bio || 'No bio available'}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Specializations</h3>
              <p className="text-gray-700">{guide.specializations || 'Not specified'}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <p className="text-gray-700">{guide.availability || 'Not specified'}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                Profile editing feature coming soon. Contact admin for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideProfile;
