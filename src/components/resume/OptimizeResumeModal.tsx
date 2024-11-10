import React, { useState } from 'react';
import { X, Loader2, AlertCircle, CheckCircle, Bot, FileText, Download } from 'lucide-react';
import { ResumeData } from './types';
import { useAI } from '../ai/AIProvider';
import { useUser } from '../../contexts/UserContext';

interface OptimizeResumeModalProps {
  onClose: () => void;
  userId: string;
}

const OptimizeResumeModal: React.FC<OptimizeResumeModalProps> = ({ onClose, userId }) => {
  const { userData } = useUser();
  const { generateAIResponse } = useAI();
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: boolean }>({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user's saved resumes
  const savedResumes = JSON.parse(localStorage.getItem(`resumes_${userId}`) || '[]');

  const handleOptimize = async () => {
    if (!selectedResume) return;

    setIsOptimizing(true);
    setError(null);

    try {
      const resume = savedResumes.find((r: any) => r.id === selectedResume);
      if (!resume) throw new Error('Resume not found');

      // Get the resume data from the URL
      const response = await fetch(resume.url);
      const resumeData: ResumeData = await response.json();

      // Get selected skills
      const confirmedSkills = Object.entries(selectedSkills)
        .filter(([_, selected]) => selected)
        .map(([skill]) => skill);

      const prompt = `Please optimize this resume for better impact and effectiveness. Here's the current resume data:
      ${JSON.stringify(resumeData)}

      The user has confirmed the following skills:
      ${confirmedSkills.join(', ')}

      Please provide an optimized version that:
      1. Uses stronger action verbs
      2. Quantifies achievements where possible
      3. Aligns skills with modern industry standards
      4. Improves the professional summary
      5. Enhances job descriptions to highlight achievements
      6. Maintains truthfulness while maximizing impact

      Return only the optimized resume data in the same JSON format.`;

      const optimizedData = await generateAIResponse(prompt);
      const parsedData = JSON.parse(optimizedData);

      setOptimizedResume(parsedData);

      // Save the optimized resume
      const newResume = {
        id: Date.now().toString(),
        name: `${resumeData.full_name}'s Optimized Resume`,
        createdAt: new Date(),
        url: resume.url, // This would be updated with the new URL in a real app
        type: 'resume'
      };

      const updatedResumes = [...savedResumes, newResume];
      localStorage.setItem(`resumes_${userId}`, JSON.stringify(updatedResumes));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize resume');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Optimize Resume</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          {!optimizedResume && (
            <>
              {/* Resume Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Select Resume to Optimize</h4>
                <div className="space-y-2">
                  {savedResumes.map((resume: any) => (
                    <label
                      key={resume.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="resume"
                        checked={selectedResume === resume.id}
                        onChange={() => setSelectedResume(resume.id)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{resume.name}</p>
                        <p className="text-sm text-gray-500">
                          Created {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills Confirmation */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Confirm Your Skills</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Select the skills you want to emphasize in your optimized resume:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {userData.skills.map((skill) => (
                    <label key={skill} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={selectedSkills[skill] || false}
                        onChange={(e) => setSelectedSkills(prev => ({
                          ...prev,
                          [skill]: e.target.checked
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {isOptimizing && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-600" />
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Optimizing Your Resume</p>
              <p className="text-sm text-gray-600">Using AI to enhance your professional profile</p>
            </div>
          )}

          {optimizedResume && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Resume Optimized!</span>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap font-serif">
                  {/* Display optimized resume preview */}
                  <h4>Professional Summary</h4>
                  <p>{optimizedResume.summary}</p>
                  
                  <h4>Work Experience</h4>
                  {optimizedResume.work_experience?.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h5>{exp.job_title} at {exp.company_name}</h5>
                      <p className="text-sm text-gray-600">
                        {exp.start_date} - {exp.end_date || 'Present'}
                      </p>
                      <ul>
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          {!optimizedResume ? (
            <button
              onClick={handleOptimize}
              disabled={!selectedResume || isOptimizing}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  Optimize Resume
                </>
              )}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setOptimizedResume(null);
                  setSelectedResume(null);
                  setSelectedSkills({});
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Optimize Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizeResumeModal;