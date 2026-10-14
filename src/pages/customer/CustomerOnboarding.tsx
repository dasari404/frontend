import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as customerApi from '../../api/customer';

const CustomerOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { customer } = useAuth();
  const navigate = useNavigate();

  const [step1Data, setStep1Data] = useState({
    fullName: customer?.fullName || '',
    mobile: customer?.mobile || '',
  });

  const [step2Data, setStep2Data] = useState({
    ageGroup: '',
    nationality: '',
    preferredLanguage: '',
    travelType: '',
    budgetRange: '',
    accessibilityNeeds: '',
  });

  const [step3Data, setStep3Data] = useState({
    preferredDestinations: '',
    preferredExperiences: '',
    foodPreferences: '',
    travelStyle: '',
  });

  const handleSubmitStep = async (step: number, data: any) => {
    setLoading(true);
    setError('');
    try {
      await customerApi.saveOnboardingStep(step, data);
      if (step < 4) {
        setCurrentStep(step + 1);
      } else {
        navigate('/customer/dashboard');
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
        <h2 className="text-3xl font-bold mb-6">Customer Onboarding</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}>
                  {step}
                </div>
                {step < 4 && <div className="w-24 h-1 bg-gray-300 mx-2"></div>}
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
            <h3 className="text-xl font-semibold mb-4">Step 2: Travel Preferences</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
              <select
                value={step2Data.ageGroup}
                onChange={(e) => setStep2Data({ ...step2Data, ageGroup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Age Group</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="51+">51+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                value={step2Data.nationality}
                onChange={(e) => setStep2Data({ ...step2Data, nationality: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
              <input
                type="text"
                value={step2Data.preferredLanguage}
                onChange={(e) => setStep2Data({ ...step2Data, preferredLanguage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Type</label>
              <select
                value={step2Data.travelType}
                onChange={(e) => setStep2Data({ ...step2Data, travelType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Travel Type</option>
                <option value="Solo">Solo</option>
                <option value="Couple">Couple</option>
                <option value="Family">Family</option>
                <option value="Group">Group</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
              <select
                value={step2Data.budgetRange}
                onChange={(e) => setStep2Data({ ...step2Data, budgetRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Budget Range</option>
                <option value="<5000">&lt; ₹5000/day</option>
                <option value="5000-10000">₹5000-10000/day</option>
                <option value="10000-20000">₹10000-20000/day</option>
                <option value=">20000">&gt; ₹20000/day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Needs</label>
              <input
                type="text"
                value={step2Data.accessibilityNeeds}
                onChange={(e) => setStep2Data({ ...step2Data, accessibilityNeeds: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Optional"
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
            <h3 className="text-xl font-semibold mb-4">Step 3: Interests & Preferences</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Destinations</label>
              <textarea
                value={step3Data.preferredDestinations}
                onChange={(e) => setStep3Data({ ...step3Data, preferredDestinations: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="e.g., Mountains, Beaches, Historical sites"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Experiences</label>
              <textarea
                value={step3Data.preferredExperiences}
                onChange={(e) => setStep3Data({ ...step3Data, preferredExperiences: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="e.g., Adventure, Culture, Relaxation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Preferences</label>
              <input
                type="text"
                value={step3Data.foodPreferences}
                onChange={(e) => setStep3Data({ ...step3Data, foodPreferences: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Vegetarian, Vegan, Non-veg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
              <select
                value={step3Data.travelStyle}
                onChange={(e) => setStep3Data({ ...step3Data, travelStyle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Travel Style</option>
                <option value="Budget">Budget</option>
                <option value="Comfort">Comfort</option>
                <option value="Luxury">Luxury</option>
              </select>
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
            <h3 className="text-xl font-semibold mb-4">Step 4: Review & Confirm</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Review your information and confirm to complete onboarding.</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmitStep(4, {})}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Completing...' : 'Complete Onboarding'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOnboarding;
