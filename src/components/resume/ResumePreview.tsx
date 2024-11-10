import React from 'react';
import { ResumeData } from './types';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  if (!data.full_name) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview</h2>
      
      <div className="prose max-w-none">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{data.full_name}</h1>
          <div className="text-gray-600">
            {data.contact_email} • {data.phone_number} • {data.location}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
            <p className="text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.work_experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Work Experience</h2>
            {data.work_experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-gray-800">
                  {exp.job_title} at {exp.company_name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {exp.location} • {new Date(exp.start_date).toLocaleDateString()} - 
                  {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                </p>
                <ul className="list-disc list-inside mt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-medium text-gray-800">
                  {edu.degree} in {edu.field_of_study}
                </h3>
                <p className="text-gray-600 text-sm">
                  {edu.institution} • Graduated {new Date(edu.graduation_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;