import React, { useState } from 'react';
import { 
  X, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Download, 
  Sparkles,
  Bot,
  Award,
  Code,
  Users
} from 'lucide-react';
import { Job } from './types';
import { useAI } from '../ai/AIProvider';
import { useUser } from '../../contexts/UserContext';

interface CoverLetterModalProps {
  job: Job;
  onClose: () => void;
  missingSkills: string[];
}

const CoverLetterModal: React.FC<CoverLetterModalProps> = ({ job, onClose, missingSkills }) => {
  const { generateCoverLetter } = useAI();
  const { userData } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [includeMissingSkills, setIncludeMissingSkills] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(missingSkills.map(skill => [skill, false]))
  );

  // Mock user insights - In a real app, these would come from user's activity
  const userInsights = [
    { 
      type: 'certification',
      icon: Award,
      title: 'Recent Certification',
      text: 'Git Essentials Certification',
      date: 'Completed March 2024'
    },
    { 
      type: 'project',
      icon: Code,
      title: 'Recent Project',
      text: 'Node.js World Clock Project',
      date: 'Built February 2024'
    },
    { 
      type: 'experience',
      icon: Users,
      title: 'Leadership Experience',
      text: 'Team Lead at University Hackathon',
      date: 'January 2024'
    }
  ];

  const loadingMessages = [
    "Analyzing job requirements...",
    "Matching your skills...",
    "Crafting your introduction...",
    "Adding personal touch...",
    "Polishing final details..."
  ];
  const [loadingStep, setLoadingStep] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setLoadingStep(0);
    try {
      const additionalSkills = Object.entries(includeMissingSkills)
        .filter(([_, include]) => include)
        .map(([skill]) => skill);

      const letter = await generateCoverLetter({
        jobTitle: job.title,
        company: job.company,
        description: job.description,
        requirements: job.requirements,
        userSkills: userData.skills,
        additionalSkills,
        missingSkills: missingSkills.filter(skill => !includeMissingSkills[skill])
      });
      
      setCoverLetter(letter);

      // Save cover letter to user's documents
      const savedCoverLetters = JSON.parse(localStorage.getItem(`cover_letters_${userData.id}`) || '[]');
      savedCoverLetters.push({
        id: Date.now().toString(),
        name: `Cover Letter - ${job.company}`,
        createdAt: new Date(),
        url: '#', // In a real app, this would be the actual URL
        metadata: {
          company: job.company,
          position: job.title
        }
      });
      localStorage.setItem(`cover_letters_${userData.id}`, JSON.stringify(savedCoverLetters));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!coverLetter) return;
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    if (!coverLetter) return;
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${job.company.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Generate Cover Letter</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          {!coverLetter && !isGenerating && (
            <>
              {missingSkills.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    The following skills are required for this position. Select any that you're currently learning or have experience with that isn't listed in your profile:
                  </p>
                  <div className="space-y-2">
                    {missingSkills.map(skill => (
                      <label key={skill} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeMissingSkills[skill]}
                          onChange={(e) => setIncludeMissingSkills(prev => ({
                            ...prev,
                            [skill]: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Note: For unchecked skills, we'll acknowledge them in your cover letter and emphasize your eagerness to learn and grow in these areas.
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
                <p className="text-sm text-gray-600 mb-3">
                  We'll highlight these relevant achievements in your cover letter:
                </p>
                <div className="space-y-4">
                  {userInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-white rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{insight.title}</p>
                          <p className="text-sm font-medium text-gray-800">{insight.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{insight.date}</p>
                        </div>
                      </div>
                    );
                  })}
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

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-600" />
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Generating Your Cover Letter</p>
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="w-4 h-4" />
                <p className="text-sm">{loadingMessages[loadingStep]}</p>
              </div>
            </div>
          )}

          {coverLetter && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Cover Letter Generated!</span>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap font-serif">{coverLetter}</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          {!coverLetter ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Cover Letter
                </>
              )}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors group relative"
              >
                <span className="flex items-center gap-2 justify-center">
                  <Copy className={`w-4 h-4 ${copyStatus === 'copied' ? 'text-green-500' : ''}`} />
                  <span className="group-hover:hidden">
                    {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
                  </span>
                  <span className="hidden group-hover:inline">Copy to Clipboard</span>
                </span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors group relative"
              >
                <span className="flex items-center gap-2 justify-center">
                  <Download className="w-4 h-4" />
                  <span className="group-hover:hidden">Save</span>
                  <span className="hidden group-hover:inline">Download as Text</span>
                </span>
              </button>
              <button
                onClick={() => {
                  setCoverLetter(null);
                  setError(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;