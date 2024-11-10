import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Star, Award, Target, Book } from 'lucide-react';
import CareerPathHeader from './CareerPathHeader';
import CareerJourneyMap from './CareerJourneyMap';
import CompetencyOverview from './CompetencyOverview';
import MilestoneTracker from './MilestoneTracker';
import { useUser } from '../../contexts/UserContext';
import { CAREER_PATHS } from '../../types';

const CareerPathPage = () => {
  const { userData } = useUser();
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const careerInfo = CAREER_PATHS[userData.careerPath].specializations[userData.specialization];

  const mockData = {
    careerPaths: [
      {
        id: '1',
        title: careerInfo.title,
        level: userData.experience,
        progress: 75,
        currentMilestone: `Advanced ${careerInfo.title} Patterns`,
        skills: careerInfo.requiredSkills.map((skill, index) => ({
          name: skill,
          level: Math.max(30, Math.min(90, 90 - index * 15))
        })),
        milestones: [
          {
            id: 'm1',
            title: 'Foundations',
            completed: true,
            achievements: [
              { id: 'a1', title: `${careerInfo.title} Basics`, date: '2024-01-15', icon: 'award' },
              { id: 'a2', title: 'Core Concepts', date: '2024-02-01', icon: 'book' },
            ],
          },
          {
            id: 'm2',
            title: `${careerInfo.title} Development`,
            completed: true,
            achievements: [
              { id: 'a3', title: careerInfo.certifications[0], date: '2024-02-15', icon: 'award' },
              { id: 'a4', title: 'First Project', date: '2024-03-01', icon: 'star' },
            ],
          },
          {
            id: 'm3',
            title: 'Advanced Skills',
            current: true,
            achievements: [
              { id: 'a5', title: 'Advanced Patterns', date: '2024-03-15', icon: 'target' },
            ],
          },
          {
            id: 'm4',
            title: 'Expert Level',
            upcoming: true,
          },
        ],
        jobEligibility: [
          careerInfo.title,
          `Senior ${careerInfo.title}`,
          `Lead ${careerInfo.title}`,
        ],
      },
    ],
    preferences: {
      workStyle: 'Full-Time',
      location: userData.location || 'Remote',
      industryFocus: ['Technology', 'E-commerce'],
    },
  };

  const currentPath = mockData.careerPaths[currentPathIndex];

  const handleNextPath = () => {
    setCurrentPathIndex((prev) => 
      prev < mockData.careerPaths.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevPath = () => {
    setCurrentPathIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Career Path Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handlePrevPath}
          disabled={currentPathIndex === 0}
          className={`p-2 rounded-full ${
            currentPathIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Your Career Journey</h1>
          <p className="text-gray-600">Swipe to explore different paths</p>
        </div>
        <button
          onClick={handleNextPath}
          disabled={currentPathIndex === mockData.careerPaths.length - 1}
          className={`p-2 rounded-full ${
            currentPathIndex === mockData.careerPaths.length - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CareerPathHeader
            title={currentPath.title}
            level={currentPath.level}
            progress={currentPath.progress}
            currentMilestone={currentPath.currentMilestone}
          />
          
          <CareerJourneyMap milestones={currentPath.milestones} />
          
          <CompetencyOverview
            skills={currentPath.skills}
            jobEligibility={currentPath.jobEligibility}
          />
        </div>

        <div className="space-y-6">
          <MilestoneTracker
            milestones={currentPath.milestones}
            preferences={mockData.preferences}
          />

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="flex items-center justify-between w-full p-3 border rounded-lg hover:border-blue-500 transition-colors">
                <span className="text-sm text-gray-800">Set New Goal</span>
                <Target className="w-4 h-4 text-gray-400" />
              </button>
              <button className="flex items-center justify-between w-full p-3 border rounded-lg hover:border-purple-500 transition-colors">
                <span className="text-sm text-gray-800">Add Career Path</span>
                <MapPin className="w-4 h-4 text-gray-400" />
              </button>
              <button className="flex items-center justify-between w-full p-3 border rounded-lg hover:border-yellow-500 transition-colors">
                <span className="text-sm text-gray-800">Update Preferences</span>
                <Star className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathPage;