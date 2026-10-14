import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import GuideCard from '../../components/GuideCard';
import * as guideApi from '../../api/guide';
import type { GuidePublicResponse } from '../../types';

const BrowseGuides: React.FC = () => {
  const [guides, setGuides] = useState<GuidePublicResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    language: '',
    minRate: '',
    maxRate: '',
    minRating: '',
    level: '',
  });

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const filterParams: any = {};
      if (filters.city) filterParams.city = filters.city;
      if (filters.language) filterParams.language = filters.language;
      if (filters.minRate) filterParams.minRate = Number(filters.minRate);
      if (filters.maxRate) filterParams.maxRate = Number(filters.maxRate);
      if (filters.minRating) filterParams.minRating = Number(filters.minRating);
      if (filters.level) filterParams.level = filters.level;
      
      const data = await guideApi.listPublicGuides(filterParams);
      setGuides(data);
    } catch (err) {
      console.error('Failed to fetch guides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGuides();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Browse Guides</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Delhi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <input
                  type="text"
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., English"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guide Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Levels</option>
                  <option value="Starter">Starter</option>
                  <option value="Standard">Standard</option>
                  <option value="Professional">Professional</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Rate (₹/day)</label>
                <input
                  type="number"
                  value={filters.minRate}
                  onChange={(e) => setFilters({ ...filters, minRate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Rate (₹/day)</label>
                <input
                  type="number"
                  value={filters.maxRate}
                  onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading guides...</div>
            </div>
          ) : guides.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No guides found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrowseGuides;
