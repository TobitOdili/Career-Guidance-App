import React from 'react';
import { Award, Trophy, Target } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: 'award' | 'trophy';
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  nextMilestone: {
    title: string;
    description: string;
    progress: number;
  };
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, nextMilestone }) => {
  const getIcon = (type: Achievement['icon']) => {
    switch (type) {
      case 'award':
        return <Award className="w-6 h-6 text-yellow-500" />;
      case 'trophy':
        return <Trophy className="w-6 h-6 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements & Milestones</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            Next Milestone
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-1">{nextMilestone.title}</h4>
            <p className="text-sm text-blue-700 mb-3">{nextMilestone.description}</p>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${nextMilestone.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:border-yellow-500 transition-colors"
              >
                {getIcon(achievement.icon)}
                <div>
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                  <span className="text-xs text-gray-500">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;