import React from 'react';
import { Code, Palette, Briefcase, Users, BarChart, Target } from 'lucide-react';
import { CareerPathType, CAREER_PATHS } from '../../types';
import PersonalDetailsForm from './PersonalDetailsForm';

interface OnboardingStepProps {
  type: 'career' | 'specialization' | 'experience' | 'interests' | 'personal';
  currentValue: any;
  onChange: (value: any) => void;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ type, currentValue, onChange }) => {
  const getCareerIcon = (path: CareerPathType) => {
    switch (path) {
      case 'engineering':
        return <Code className="w-6 h-6" />;
      case 'design':
        return <Palette className="w-6 h-6" />;
      case 'management':
        return <Briefcase className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getExperienceDetails = (level: string) => {
    switch (level) {
      case 'beginner':
        return {
          title: 'Beginner',
          description: 'Just starting out',
          icon: <Target className="w-6 h-6" />,
          colors: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
        };
      case 'intermediate':
        return {
          title: 'Intermediate',
          description: 'Some experience',
          icon: <BarChart className="w-6 h-6" />,
          colors: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
        };
      case 'advanced':
        return {
          title: 'Advanced',
          description: 'Extensive experience',
          icon: <Users className="w-6 h-6" />,
          colors: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
        };
      default:
        return {
          title: '',
          description: '',
          icon: null,
          colors: ''
        };
    }
  };

  const renderCareerPaths = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(Object.keys(CAREER_PATHS) as CareerPathType[]).map((path) => {
        const isSelected = currentValue === path;
        return (
          <div
            key={path}
            onClick={() => onChange(path)}
            className={`cursor-pointer group relative p-6 rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200 ring-offset-2'
                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:ring-2 hover:ring-blue-100 hover:ring-offset-2'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-blue-100' : 'bg-gray-50 group-hover:bg-blue-100'
              }`}>
                {getCareerIcon(path)}
              </div>
              <h3 className="text-lg font-semibold">{CAREER_PATHS[path].title}</h3>
            </div>
            <p className="text-gray-600 group-hover:text-gray-700">
              {CAREER_PATHS[path].description}
            </p>
          </div>
        );
      })}
    </div>
  );

  const renderSpecializations = () => {
    const careerPath = currentValue.careerPath || 'engineering';
    const specializations = CAREER_PATHS[careerPath].specializations;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(specializations).map(([key, spec]) => {
          const isSelected = currentValue.specialization === key;
          return (
            <div
              key={key}
              onClick={() => onChange(key)}
              className={`cursor-pointer group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200 ring-offset-2'
                  : 'bg-white border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:ring-2 hover:ring-indigo-100 hover:ring-offset-2'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
              <p className="text-gray-600 mb-4 group-hover:text-gray-700">
                {spec.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {spec.requiredSkills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-50 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderExperienceLevels = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['beginner', 'intermediate', 'advanced'].map((level) => {
        const details = getExperienceDetails(level);
        const isSelected = currentValue === level;
        return (
          <div
            key={level}
            onClick={() => onChange(level)}
            className={`cursor-pointer relative p-6 rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? `${details.colors} ring-2 ring-offset-2`
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:ring-2 hover:ring-offset-2 hover:ring-gray-100'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-white bg-opacity-50' : 'bg-gray-50'
              }`}>
                {details.icon}
              </div>
              <h3 className="text-lg font-semibold">{details.title}</h3>
            </div>
            <p className="text-gray-600">{details.description}</p>
          </div>
        );
      })}
    </div>
  );

  const renderInterests = () => {
    const interests = [
      { name: 'AI & Machine Learning', colors: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-100' },
      { name: 'Mobile Development', colors: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-100' },
      { name: 'Cloud Computing', colors: 'bg-cyan-50 text-cyan-700 border-cyan-200 ring-cyan-100' },
      { name: 'Cybersecurity', colors: 'bg-red-50 text-red-700 border-red-200 ring-red-100' },
      { name: 'Data Science', colors: 'bg-green-50 text-green-700 border-green-200 ring-green-100' },
      { name: 'DevOps', colors: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-100' },
      { name: 'Blockchain', colors: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-100' },
      { name: 'IoT', colors: 'bg-teal-50 text-teal-700 border-teal-200 ring-teal-100' }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {interests.map(({ name, colors }) => {
          const isSelected = currentValue?.includes(name);
          return (
            <div
              key={name}
              onClick={() => {
                const currentInterests = currentValue || [];
                const newInterests = currentInterests.includes(name)
                  ? currentInterests.filter(i => i !== name)
                  : [...currentInterests, name];
                onChange(newInterests);
              }}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? `${colors} ring-2 ring-offset-2`
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:ring-2 hover:ring-offset-2 hover:ring-gray-100'
              }`}
            >
              <span className="text-base font-medium">{name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (type === 'personal') {
    return <PersonalDetailsForm currentValue={currentValue} onChange={onChange} />;
  }

  switch (type) {
    case 'career':
      return renderCareerPaths();
    case 'specialization':
      return renderSpecializations();
    case 'experience':
      return renderExperienceLevels();
    case 'interests':
      return renderInterests();
    default:
      return null;
  }
};

export default OnboardingStep;