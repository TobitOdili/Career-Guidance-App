import React from 'react';
import { MapPin, Briefcase, Target } from 'lucide-react';

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

interface Preferences {
  workStyle: string;
  location: string;
  industryFocus: string[];
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  preferences: Preferences;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  milestones,
  preferences,
}) => {
  const currentMilestone = milestones.find((m) => m.current);
  const nextMilestone = milestones.find((m) => m.upcoming);

  return (
    <div className="space-y-6">
      {/* Current Focus */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Focus</h2>
        {currentMilestone && (
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">{currentMilestone.title}</h3>
                {currentMilestone.achievements && (
                  <div className="mt-2 space-y-2">
                    {currentMilestone.achievements.map((achievement) => (
                      <p key={achievement.id} className="text-sm text-blue-700">
                        • {achievement.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Up */}
      {nextMilestone && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Up</h2>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-800">{nextMilestone.title}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Complete current milestone to unlock
            </p>
          </div>
        </div>
      )}

      {/* Career Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Work Style</p>
              <p className="font-medium text-gray-800">{preferences.workStyle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium text-gray-800">{preferences.location}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Industry Focus</p>
            <div className="flex flex-wrap gap-2">
              {preferences.industryFocus.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;