import React from 'react';
import { 
  DollarSign, 
  Users, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Clock
} from 'lucide-react';
import JobMatchScore from './JobMatchScore';
import JobDetails from './JobDetails';
import JobAIActions from './JobAIActions';
import { formatRelativeTime } from '../../utils/date';
import { Job } from './types';

interface JobCardProps {
  job: Job;
  expandedJob: string | null;
  expandedAIActions: string | null;
  onToggleExpand: (jobId: string) => void;
  onToggleAIActions: (jobId: string) => void;
  onGenerateCoverLetter: (job: Job) => void;
  onGenerateInterviewQuestions: (job: Job) => void;
  onOptimizeResume: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  expandedJob,
  expandedAIActions,
  onToggleExpand,
  onToggleAIActions,
  onGenerateCoverLetter,
  onGenerateInterviewQuestions,
  onOptimizeResume
}) => {
  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getSalaryColor = (score: string) => {
    switch (score) {
      case 'low':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-blue-50/20">
      <div 
        className="p-6 cursor-pointer" 
        onClick={() => onToggleExpand(job.id)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {job.title}
            </h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500 mt-1">{job.location}</p>
          </div>
          <JobMatchScore score={job.matchScore} />
        </div>

        <div className="flex items-center gap-6 text-sm mb-4">
          <div className="flex items-center gap-1">
            <DollarSign className={`w-4 h-4 ${getSalaryColor(job.salary.score)}`} />
            <span className="text-gray-600">{job.salary.range}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className={`w-4 h-4 ${getCompetitionColor(job.competition)}`} />
            <span className="text-gray-600 capitalize">{job.competition} Competition</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">
              {job.skillMatch.userHas.length}/{job.skillMatch.required.length} Skills
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillMatch.required.map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                job.skillMatch.userHas.includes(skill)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{formatRelativeTime(new Date(job.postedDate))}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleAIActions(job.id);
              }}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-700"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">AI Actions</span>
            </button>

            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
              {expandedJob === job.id ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-sm">Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-sm">Show More</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {expandedAIActions === job.id && (
        <JobAIActions
          job={job}
          onGenerateCoverLetter={onGenerateCoverLetter}
          onGenerateInterviewQuestions={onGenerateInterviewQuestions}
          onUpdateResume={onOptimizeResume}
        />
      )}

      {expandedJob === job.id && (
        <JobDetails job={job} />
      )}
    </div>
  );
};

export default JobCard;