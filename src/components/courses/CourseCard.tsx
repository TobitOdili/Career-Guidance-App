import React from 'react';
import { Clock, Award, Star, BarChart } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  difficulty: string;
  type: string;
  certification: boolean;
  imageUrl: string;
  progress?: number;
  matchScore?: number;
  completedDate?: string;
  rating?: number;
}

interface CourseCardProps {
  course: Course;
  type: 'inProgress' | 'recommended' | 'completed';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, type }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {type === 'inProgress' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-semibold text-gray-800">{course.title}</h3>
          {course.certification && (
            <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3">{course.provider}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            getDifficultyColor(course.difficulty)
          }`}>
            {course.difficulty}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {course.type}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>

          {type === 'recommended' && course.matchScore && (
            <div className="flex items-center gap-1 text-blue-600">
              <BarChart className="w-4 h-4" />
              <span>{course.matchScore}% Match</span>
            </div>
          )}

          {type === 'completed' && course.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{course.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;