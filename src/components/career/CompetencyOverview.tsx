import React from 'react';
import { Briefcase } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface CompetencyOverviewProps {
  skills: Skill[];
  jobEligibility: string[];
}

const CompetencyOverview: React.FC<CompetencyOverviewProps> = ({
  skills,
  jobEligibility,
}) => {
  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Skills & Competencies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Core Skills</h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-600">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillLevelColor(
                      skill.level
                    )}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Job Eligibility</h3>
          <div className="space-y-3">
            {jobEligibility.map((job, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">{job}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencyOverview;