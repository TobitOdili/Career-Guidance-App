import React from 'react';

interface OnboardingProgressProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
  currentStep: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-12">
      <div className="relative flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-blue-100 text-blue-600'
                  : index === currentStep
                  ? 'bg-blue-50 text-blue-600 ring-4 ring-blue-100'
                  : 'bg-gray-50 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                index <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          </div>
        ))}
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-100 -z-10" />
        <div 
          className="absolute top-5 left-0 h-[2px] bg-blue-100 transition-all duration-500 -z-10"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <p className="text-lg text-gray-600 text-center">
        {steps[currentStep].description}
      </p>
    </div>
  );
};

export default OnboardingProgress;