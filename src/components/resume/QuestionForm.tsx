import React, { useState } from 'react';
import { ResumeBuilderStep, ResumeData, WorkExperience, Education } from './types';
import { useAI } from '../ai/AIProvider';
import { Bot, Sparkles, Plus, Trash2, Calendar } from 'lucide-react';

interface QuestionFormProps {
  step: ResumeBuilderStep;
  data: Partial<ResumeData>;
  onChange: (data: Partial<ResumeData>) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ step, data, onChange }) => {
  const { isEnabled } = useAI();
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({
    responsibilities: ['']
  });
  const [newEducation, setNewEducation] = useState<Partial<Education>>({});

  const handleInputChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const handleAddExperience = () => {
    if (newExperience.job_title && newExperience.company_name) {
      const experiences = [...(data.work_experience || []), newExperience as WorkExperience];
      onChange({ work_experience: experiences });
      setNewExperience({ responsibilities: [''] });
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      const educations = [...(data.education || []), newEducation as Education];
      onChange({ education: educations });
      setNewEducation({});
    }
  };

  const renderExperienceForm = () => (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newExperience.job_title || ''}
          onChange={(e) => setNewExperience({ ...newExperience, job_title: e.target.value })}
          placeholder="Job Title"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newExperience.company_name || ''}
          onChange={(e) => setNewExperience({ ...newExperience, company_name: e.target.value })}
          placeholder="Company Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newExperience.location || ''}
          onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={newExperience.start_date || ''}
            onChange={(e) => setNewExperience({ ...newExperience, start_date: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newExperience.end_date || ''}
            onChange={(e) => setNewExperience({ ...newExperience, end_date: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Responsibilities</h4>
        {newExperience.responsibilities?.map((resp, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={resp}
              onChange={(e) => {
                const newResp = [...(newExperience.responsibilities || [])];
                newResp[index] = e.target.value;
                setNewExperience({ ...newExperience, responsibilities: newResp });
              }}
              placeholder="Add responsibility"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                const newResp = newExperience.responsibilities?.filter((_, i) => i !== index);
                setNewExperience({ ...newExperience, responsibilities: newResp });
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newResp = [...(newExperience.responsibilities || []), ''];
            setNewExperience({ ...newExperience, responsibilities: newResp });
          }}
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Responsibility
        </button>
      </div>
      <button
        onClick={handleAddExperience}
        disabled={!newExperience.job_title || !newExperience.company_name}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Experience
      </button>
    </div>
  );

  const renderEducationForm = () => (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newEducation.degree || ''}
          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
          placeholder="Degree"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newEducation.field_of_study || ''}
          onChange={(e) => setNewEducation({ ...newEducation, field_of_study: e.target.value })}
          placeholder="Field of Study"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newEducation.institution || ''}
          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
          placeholder="Institution"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={newEducation.graduation_date || ''}
          onChange={(e) => setNewEducation({ ...newEducation, graduation_date: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleAddEducation}
        disabled={!newEducation.degree || !newEducation.institution}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Education
      </button>
    </div>
  );

  const renderInput = (question: any) => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={data[question.field] || ''}
            onChange={(e) => handleInputChange(question.field, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required={question.required}
          />
        );
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              value={data[question.field] || ''}
              onChange={(e) => handleInputChange(question.field, e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required={question.required}
            />
            {isEnabled && question.aiPrompt && (
              <button className="absolute bottom-2 right-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bot className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            {data.work_experience?.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{exp.job_title}</h4>
                    <p className="text-sm text-gray-600">{exp.company_name}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newExp = data.work_experience?.filter((_, i) => i !== index);
                      handleInputChange('work_experience', newExp);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {renderExperienceForm()}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            {data.education?.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newEdu = data.education?.filter((_, i) => i !== index);
                      handleInputChange('education', newEdu);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {renderEducationForm()}
          </div>
        );
      case 'array':
        return (
          <div className="space-y-2">
            {(data[question.field] || []).map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...(data[question.field] || [])];
                    newArray[index] = e.target.value;
                    handleInputChange(question.field, newArray);
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const newArray = [...(data[question.field] || [])];
                    newArray.splice(index, 1);
                    handleInputChange(question.field, newArray);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                handleInputChange(question.field, [...(data[question.field] || []), '']);
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add {question.field}</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{step.title}</h2>
        <p className="text-gray-600">{step.description}</p>
      </div>

      <div className="space-y-4">
        {step.questions.map((question) => (
          <div key={question.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput(question)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;