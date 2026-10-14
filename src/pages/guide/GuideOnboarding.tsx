import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as guideApi from '../../api/guide';

const GuideOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { guide } = useAuth();
  const navigate = useNavigate();

  const [step1Data, setStep1Data] = useState({
    fullName: guide?.fullName || '',
    mobile: guide?.mobile || '',
  });

  const [step2Data, setStep2Data] = useState({
    city: guide?.city || '',
    state: guide?.state || '',
    locationCode: '',
  });

  const [step3Data, setStep3Data] = useState({
    languages: '',
    experienceYears: 0,
    bio: '',
    specializations: '',
  });

  const [step4Data, setStep4Data] = useState({
    govtIdType: '',
    govtIdNumber: '',
  });

  const [step5Data, setStep5Data] = useState({
    dailyRate: 0,
    availability: '',
    avatarUrl: '',
  });

  const handleSubmitStep = async (step: number, data: any) => {
    setLoading(true);
    setError('');
    try {
      await guideApi.saveOnboardingStep(step, data);
      if (step < 6) {
        setCurrentStep(step + 1);
      } else {
        navigate('/guide/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save step');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Guide Onboarding</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}>
                  {step}
                </div>
                {step < 6 && <div className="w-12 h-1 bg-gray-300 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 1: Basic Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={step1Data.fullName}
                onChange={(e) => setStep1Data({ ...step1Data, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                type="tel"
                value={step1Data.mobile}
                onChange={(e) => setStep1Data({ ...step1Data, mobile: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={() => handleSubmitStep(1, step1Data)}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Next'}
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 2: Location</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={step2Data.city}
                onChange={(e) => setStep2Data({ ...step2Data, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={step2Data.state}
                onChange={(e) => setStep2Data({ ...step2Data, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Code (Optional)</label>
              <input
                type="text"
                value={step2Data.locationCode}
                onChange={(e) => setStep2Data({ ...step2Data, locationCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., DELHI-001"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(2, step2Data)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 3: Professional Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
              <input
                type="text"
                value={step3Data.languages}
                onChange={(e) => setStep3Data({ ...step3Data, languages: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., English, Hindi, Spanish"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input
                type="number"
                value={step3Data.experienceYears}
                onChange={(e) => setStep3Data({ ...step3Data, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={step3Data.bio}
                onChange={(e) => setStep3Data({ ...step3Data, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Tell customers about yourself"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
              <input
                type="text"
                value={step3Data.specializations}
                onChange={(e) => setStep3Data({ ...step3Data, specializations: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Adventure, Culture, History"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(3, step3Data)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 4: Government ID Verification</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
              <select
                value={step4Data.govtIdType}
                onChange={(e) => setStep4Data({ ...step4Data, govtIdType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select ID Type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
              <input
                type="text"
                value={step4Data.govtIdNumber}
                onChange={(e) => setStep4Data({ ...step4Data, govtIdNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(4, step4Data)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 5: Pricing & Availability</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate (₹)</label>
              <input
                type="number"
                value={step5Data.dailyRate}
                onChange={(e) => setStep5Data({ ...step5Data, dailyRate: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-600 mt-1">
                Rate determines your level: &lt;1000=Starter, &lt;2000=Standard, &lt;3500=Professional, ≥3500=Premium
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <textarea
                value={step5Data.availability}
                onChange={(e) => setStep5Data({ ...step5Data, availability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="e.g., Available weekdays, Flexible schedule"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (Optional)</label>
              <input
                type="url"
                value={step5Data.avatarUrl}
                onChange={(e) => setStep5Data({ ...step5Data, avatarUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(5, step5Data)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Step 6: Review & Submit</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                Your profile will be submitted for admin verification. You'll be notified once approved.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(5)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(6, {})}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideOnboarding;
