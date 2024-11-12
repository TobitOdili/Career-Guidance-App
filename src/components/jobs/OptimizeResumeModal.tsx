import React, { useState } from 'react';
import { X, Loader2, AlertCircle, CheckCircle, Download, Bot } from 'lucide-react';
import { Job } from './types';
import { useAI } from '../ai/AIProvider';
import { useUser } from '../../contexts/UserContext';
import { PDFService } from '../resume/services/pdfService';
import { useDocuments, Document } from '../../hooks/useDocuments';

interface OptimizeResumeModalProps {
  job: Job;
  onClose: () => void;
}

const OptimizeResumeModal: React.FC<OptimizeResumeModalProps> = ({ job, onClose }) => {
  const { userData } = useUser();
  const { generateAIResponse } = useAI();
  const { getResumeDocuments, addDocument } = useDocuments();
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user's saved resumes
  const savedResumes = getResumeDocuments();

  const handleOptimize = async () => {
    if (!selectedResume) {
      setError('Please select a resume to optimize');
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      // Get the resume data from the selected document
      const selectedDocument = savedResumes.find(doc => doc.id === selectedResume);
      if (!selectedDocument?.metadata?.resumeData) {
        throw new Error('Resume data not found');
      }

      const resumeData = selectedDocument.metadata.resumeData;

      // Add selected skills to the optimization request
      const skillsToOptimize = [...selectedSkills, ...userData.skills];

      const prompt = `Please optimize this resume for a ${job.title} position at ${job.company}.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Requirements:
${job.requirements.join('\n')}

Skills to Highlight:
${skillsToOptimize.join(', ')}

Please optimize the resume by:
1. Enhancing the professional summary to align with the job requirements
2. Highlighting relevant experience and achievements
3. Incorporating the specified skills naturally
4. Using strong action verbs
5. Quantifying achievements where possible

Return the optimized resume data in valid JSON format matching the original structure.`;

      const response = await generateAIResponse(prompt);
      const optimizedResume = JSON.parse(response);

      // Generate PDF
      const pdfUrl = await PDFService.generatePDF(optimizedResume);

      // Save to Supabase
      await addDocument({
        name: `${optimizedResume.full_name}'s Resume - ${job.company}`,
        type: 'resume',
        url: pdfUrl,
        metadata: {
          company: job.company,
          position: job.title,
          optimizedFor: job.id,
          resumeData: optimizedResume
        }
      });

      setOptimizedData(optimizedResume);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize resume');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleDownload = async () => {
    if (!optimizedData) return;

    try {
      const response = await fetch(optimizedData.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `optimized_resume_${job.company.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download resume');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Optimize Resume for {job.company}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          {!optimizedData && (
            <>
              {/* Resume Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Select Resume to Optimize</h4>
                {savedResumes.length === 0 ? (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No resumes found</p>
                    <p className="text-sm text-gray-500">Create a resume first using the Resume Builder</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedResumes.map((resume) => (
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
                            Created {new Date(resume.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Skills to Highlight</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Select any additional skills you'd like to emphasize for this position:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {job.requirements.map((skill, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSkills([...selectedSkills, skill]);
                          } else {
                            setSelectedSkills(selectedSkills.filter(s => s !== skill));
                          }
                        }}
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
              <p className="text-sm text-gray-600">Tailoring content for {job.company}</p>
            </div>
          )}

          {optimizedData && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Resume Optimized!</span>
              </div>
              
              <div className="prose max-w-none bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium text-gray-700">Professional Summary</h4>
                    <p className="text-gray-600">{optimizedData.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-700">Experience</h4>
                    {optimizedData.work_experience?.map((exp: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h5 className="font-medium text-gray-800">{exp.job_title}</h5>
                        <p className="text-sm text-gray-600">{exp.company_name}</p>
                        <p className="text-sm text-gray-500">
                          {exp.start_date} - {exp.end_date || 'Present'}
                        </p>
                        <ul className="list-disc list-inside mt-2">
                          {exp.responsibilities.map((resp: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600">{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-gray-700">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {optimizedData.skills?.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          {!optimizedData ? (
            <button
              onClick={handleOptimize}
              disabled={!selectedResume || isOptimizing || savedResumes.length === 0}
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
                onClick={handleDownload}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Optimized Resume
              </button>
              <button
                onClick={() => {
                  setOptimizedData(null);
                  setSelectedResume(null);
                  setSelectedSkills([]);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Create Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizeResumeModal;