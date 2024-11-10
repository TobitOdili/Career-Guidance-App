import React, { useState } from 'react';
import { CareerPathType, UserProfile } from '../types';
import OnboardingProgress from './onboarding/OnboardingProgress';
import OnboardingStep from './onboarding/OnboardingStep';
import { useSupabase } from '../hooks/useSupabase';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

const STEPS = [
  {
    title: 'Career Path',
    description: 'Choose your desired career path'
  },
  {
    title: 'Specialization',
    description: 'Select your area of focus'
  },
  {
    title: 'Experience',
    description: 'Tell us about your current level'
  },
  {
    title: 'Interests',
    description: 'Select areas that interest you'
  },
  {
    title: 'Personal Details',
    description: 'Tell us about yourself'
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    careerPath: undefined,
    specialization: undefined,
    experience: 'beginner',
    name: '',
    email: '',
    skills: [],
    interests: [],
    location: '',
    preferredLanguage: 'en'
  });
  const { saveUser } = useSupabase();

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        // Only save user data when form is complete
        if (formData.name && formData.email) {
          const user = await saveUser(formData.email, formData.name);
          if (user) {
            localStorage.setItem('userId', user.id);
            onComplete({ ...formData, id: user.id });
          }
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepChange = (value: any) => {
    switch (currentStep) {
      case 0:
        setFormData(prev => ({ 
          ...prev, 
          careerPath: value as CareerPathType,
          specialization: undefined 
        }));
        break;
      case 1:
        setFormData(prev => ({ ...prev, specialization: value }));
        break;
      case 2:
        setFormData(prev => ({ ...prev, experience: value }));
        break;
      case 3:
        setFormData(prev => ({ ...prev, interests: value }));
        break;
      case 4:
        setFormData(prev => ({ ...prev, ...value }));
        break;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.careerPath;
      case 1:
        return formData.specialization;
      case 2:
        return formData.experience;
      case 3:
        return formData.interests && formData.interests.length > 0;
      case 4:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <OnboardingProgress steps={STEPS} currentStep={currentStep} />

      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-8">
        <OnboardingStep
          type={STEPS[currentStep].title.toLowerCase().split(' ')[0] as any}
          currentValue={
            currentStep === 0
              ? formData.careerPath
              : currentStep === 1
              ? { careerPath: formData.careerPath, specialization: formData.specialization }
              : currentStep === 2
              ? formData.experience
              : currentStep === 3
              ? formData.interests
              : formData
          }
          onChange={handleStepChange}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
            currentStep === 0
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
            isStepValid()
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;