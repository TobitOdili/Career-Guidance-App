import React from 'react';
import { BookOpen, Video, Code } from 'lucide-react';

interface CourseHeaderProps {
  learningStyle: string;
  progress: {
    completed: number;
    total: number;
  };
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ learningStyle, progress }) => {
  const progressPercentage = Math.round((progress.completed / progress.total) * 100);

  const getLearningStyleIcon = () => {
    switch (learningStyle.toLowerCase()) {
      case 'visual':
        return <Video className="w-5 h-5" />;
      case 'hands-on':
        return <Code className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Learning Journey</h1>
          <div className="flex items-center gap-2 text-gray-600">
            {getLearningStyleIcon()}
            <span className="text-sm">{learningStyle} Learner</span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Course Progress</span>
            <span className="text-sm font-medium text-gray-800">
              {progress.completed} of {progress.total} Completed
            </span>
          </div>
          <div className="w-full md:w-64 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;