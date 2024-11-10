import React from 'react';
import { Star } from 'lucide-react';

interface JobMatchScoreProps {
  score: number;
}

const JobMatchScore: React.FC<JobMatchScoreProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="font-medium text-gray-800">{score}%</span>
      </div>
      <span className="text-xs text-gray-500">Match Score</span>
    </div>
  );
};

export default JobMatchScore;