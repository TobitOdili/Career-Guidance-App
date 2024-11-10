import React from 'react';
import { Award, Book, Star, Target } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  completed?: boolean;
  current?: boolean;
  upcoming?: boolean;
  achievements?: Array<{
    id: string;
    title: string;
    date: string;
    icon: string;
  }>;
}

interface CareerJourneyMapProps {
  milestones: Milestone[];
}

const CareerJourneyMap: React.FC<CareerJourneyMapProps> = ({ milestones }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="w-4 h-4" />;
      case 'book':
        return <Book className="w-4 h-4" />;
      case 'star':
        return <Star className="w-4 h-4" />;
      case 'target':
        return <Target className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Journey Map</h2>
      
      <div className="relative">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="mb-8 last:mb-0">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed
                    ? 'bg-green-100 text-green-600'
                    : milestone.current
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {milestone.completed ? (
                    <Award className="w-5 h-5" />
                  ) : milestone.current ? (
                    <Target className="w-5 h-5" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </div>
                {index < milestones.length - 1 && (
                  <div className={`absolute top-8 left-1/2 w-0.5 h-16 -translate-x-1/2 ${
                    milestone.completed
                      ? 'bg-green-200'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className={`font-medium ${
                  milestone.completed
                    ? 'text-green-600'
                    : milestone.current
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}>
                  {milestone.title}
                </h3>
                
                {milestone.achievements && (
                  <div className="mt-3 space-y-2">
                    {milestone.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="text-yellow-500">
                          {getIcon(achievement.icon)}
                        </div>
                        <span>{achievement.title}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(achievement.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerJourneyMap;