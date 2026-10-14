import React from 'react';
import { Link } from 'react-router-dom';
import type { GuidePublicResponse } from '../types';

interface GuideCardProps {
  guide: GuidePublicResponse;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {guide.avatarUrl ? (
            <img src={guide.avatarUrl} alt={guide.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-500">{guide.fullName.charAt(0)}</span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{guide.fullName}</h3>
          <p className="text-sm text-gray-600">{guide.city}, {guide.state}</p>
          
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(guide.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                ({guide.rating?.toFixed(1) || '0.0'}) - {guide.reviewCount} reviews
              </span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {guide.guideLevel || 'Starter'}
              </span>
              <p className="text-lg font-bold text-gray-900 mt-1">
                ₹{guide.dailyRate || 0}/day
              </p>
            </div>
            
            <Link
              to={`/customer/guides/${guide.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
