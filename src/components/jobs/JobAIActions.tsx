import React from 'react';
import { FileText, MessageSquare, BookOpen } from 'lucide-react';
import { Job } from './types';

interface JobAIActionsProps {
  job: Job;
  onGenerateCoverLetter: (job: Job) => void;
  onGenerateInterviewQuestions: (job: Job) => void;
  onUpdateResume: (job: Job) => void;
}

const JobAIActions: React.FC<JobAIActionsProps> = ({
  job,
  onGenerateCoverLetter,
  onGenerateInterviewQuestions,
  onUpdateResume
}) => {
  return (
    <div className="px-6 py-4 bg-purple-50 border-t border-purple-100">
      <h3 className="text-sm font-medium text-purple-800 mb-3">AI Assistant Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => onGenerateCoverLetter(job)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">Generate Cover Letter</span>
        </button>
        <button
          onClick={() => onGenerateInterviewQuestions(job)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">Interview Prep</span>
        </button>
        <button
          onClick={() => onUpdateResume(job)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Optimize Resume</span>
        </button>
      </div>
    </div>
  );
};

export default JobAIActions;