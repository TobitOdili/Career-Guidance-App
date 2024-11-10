import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';

interface CareerPathHeaderProps {
  title: string;
  level: string;
  progress: number;
  currentMilestone: string;
}

const CareerPathHeader: React.FC<CareerPathHeaderProps> = ({
  title,
  level,
  progress,
  currentMilestone,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">{level} Level</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-800">{progress}% Complete</span>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Current Focus</p>
            <p className="text-blue-700 mt-1">{currentMilestone}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default CareerPathHeader;