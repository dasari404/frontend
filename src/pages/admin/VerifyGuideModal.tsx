import React, { useState } from 'react';
import * as adminApi from '../../api/admin';
import type { Guide } from '../../types';

interface VerifyGuideModalProps {
  guide: Guide;
  onClose: () => void;
  onSuccess: () => void;
}

const VerifyGuideModal: React.FC<VerifyGuideModalProps> = ({ guide, onClose, onSuccess }) => {
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (action: 'approve' | 'reject') => {
    setError('');
    setLoading(true);

    try {
      await adminApi.verifyGuide(guide.id, action, adminNotes);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify guide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Verify Guide</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-gray-50 p-6 rounded-md mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Guide Token</p>
              <p className="font-semibold">{guide.guideToken}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold">{guide.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">City</p>
              <p className="font-semibold">{guide.city}, {guide.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mobile</p>
              <p className="font-semibold">{guide.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="font-semibold">{guide.experienceYears || 0} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Daily Rate</p>
              <p className="font-semibold">₹{guide.dailyRate || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Languages</p>
              <p className="font-semibold">{guide.languages || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Level</p>
              <p className="font-semibold">{guide.guideLevel || 'Not set'}</p>
            </div>
          </div>
          
          {guide.bio && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Bio</p>
              <p className="text-gray-900">{guide.bio}</p>
            </div>
          )}
          
          {guide.specializations && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Specializations</p>
              <p className="text-gray-900">{guide.specializations}</p>
            </div>
          )}
          
          {guide.govtIdType && guide.govtIdNumber && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Government ID</p>
              <p className="text-gray-900">{guide.govtIdType}: {guide.govtIdNumber}</p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Enter notes about this verification decision..."
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => handleVerify('reject')}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Reject'}
          </button>
          <button
            onClick={() => handleVerify('approve')}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyGuideModal;
