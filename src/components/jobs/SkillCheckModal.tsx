import React, { useState } from 'react';
import { X, Plus, CheckCircle } from 'lucide-react';

interface SkillCheckModalProps {
  skills: string[];
  onClose: () => void;
  onAddSkills: (skills: string[]) => void;
}

const SkillCheckModal: React.FC<SkillCheckModalProps> = ({ skills, onClose, onAddSkills }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Missing Required Skills</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          This job requires the following skills. Do you have any of these that aren't listed in your profile?
        </p>

        <div className="space-y-2 mb-6">
          {skills.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedSkills.includes(skill)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSkills([...selectedSkills, skill]);
                  } else {
                    setSelectedSkills(selectedSkills.filter(s => s !== skill));
                  }
                }}
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedSkills.includes(skill)
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedSkills.includes(skill) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-gray-700">{skill}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedSkills.length > 0) {
                onAddSkills(selectedSkills);
              } else {
                onClose();
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Selected Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCheckModal;