import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BookingModal from './BookingModal';
import * as guideApi from '../../api/guide';
import * as reviewApi from '../../api/review';
import type { GuidePublicResponse, ReviewResponse } from '../../types';

const GuideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<GuidePublicResponse | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const guidesData = await guideApi.listPublicGuides();
        const foundGuide = guidesData.find(g => g.id === Number(id));
        if (foundGuide) {
          setGuide(foundGuide);
          const reviewsData = await reviewApi.getGuideReviews(foundGuide.id);
          setReviews(reviewsData);
        }
      } catch (err) {
        console.error('Failed to fetch guide details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuideDetails();
  }, [id]);

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
              <p className="text-gray-600 mb-4">Guide not found</p>
              <button
                onClick={() => navigate('/customer/guides')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Back to Browse
              </button>
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
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
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
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(guide.rating || 0) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>★</span>
                    ))}
                    <span className="ml-2 text-gray-600">
                      {guide.rating?.toFixed(1) || '0.0'} ({guide.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                    {guide.guideLevel || 'Starter'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600">₹{guide.dailyRate}/day</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-700">{guide.bio || 'No bio available'}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-gray-700">{guide.experienceYears || 0} years</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <p className="text-gray-700">{guide.languages || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Specializations</h3>
                <p className="text-gray-700">{guide.specializations || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-gray-700">{guide.availability || 'Contact for availability'}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 text-lg font-semibold"
            >
              Book Now
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                      <span className="ml-3 font-semibold">{review.customerName}</span>
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showBookingModal && (
        <BookingModal guide={guide} onClose={() => setShowBookingModal(false)} />
      )}
    </>
  );
};

export default GuideDetails;
