import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  inProgress?: boolean;
}

interface SkillsSectionProps {
  currentSkills: Skill[];
  suggestedSkills: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ currentSkills, suggestedSkills }) => {
  const getSkillColor = (level: Skill['level']) => {
    switch (level) {
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Skills & Expertise</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Current Skills</h3>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillColor(skill.level)} ${
                  skill.inProgress ? 'border-2 border-dashed' : ''
                }`}
              >
                {skill.name}
                {skill.inProgress && ' (In Progress)'}
              </span>
            ))}
            <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Suggested Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill, index) => (
              <button
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;