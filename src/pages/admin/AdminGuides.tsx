import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import VerifyGuideModal from './VerifyGuideModal';
import * as adminApi from '../../api/admin';
import type { Guide } from '../../types';

const AdminGuides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const data = await adminApi.listGuides(query || undefined, statusFilter || undefined, page);
      setGuides(data);
    } catch (err) {
      console.error('Failed to fetch guides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [page, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchGuides();
  };

  const handleVerifySuccess = () => {
    setSelectedGuide(null);
    fetchGuides();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Manage Guides</h1>
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <form onSubmit={handleSearch} className="flex space-x-4 mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, city, token..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading...</div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {guides.map((guide) => (
                        <tr key={guide.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {guide.guideToken}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {guide.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {guide.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {guide.guideLevel || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {guide.rating?.toFixed(1) || '0.0'} ({guide.reviewCount})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded ${
                              guide.verificationStatus === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : guide.verificationStatus === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {guide.verificationStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {guide.verificationStatus === 'pending' && (
                              <button
                                onClick={() => setSelectedGuide(guide)}
                                className="text-blue-600 hover:underline"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">Page {page + 1}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={guides.length < 20}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {selectedGuide && (
        <VerifyGuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
          onSuccess={handleVerifySuccess}
        />
      )}
    </>
  );
};

export default AdminGuides;
