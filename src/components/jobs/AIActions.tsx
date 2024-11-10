import React from 'react';
import { FileEdit, MessageSquare, Bot } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
}

interface AIActionsProps {
  job: Job;
  onAction: (action: 'coverLetter' | 'resume' | 'interview') => void;
}

const AIActions: React.FC<AIActionsProps> = ({ job, onAction }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onAction('coverLetter')}
        className="w-full flex items-center gap-2 p-2 text-sm text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
      >
        <FileEdit className="w-4 h-4" />
        Generate Cover Letter
      </button>
      <button
        onClick={() => onAction('resume')}
        className="w-full flex items-center gap-2 p-2 text-sm text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
      >
        <Bot className="w-4 h-4" />
        Optimize Resume
      </button>
      <button
        onClick={() => onAction('interview')}
        className="w-full flex items-center gap-2 p-2 text-sm text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        Interview Prep
      </button>
    </div>
  );
};

export default AIActions;