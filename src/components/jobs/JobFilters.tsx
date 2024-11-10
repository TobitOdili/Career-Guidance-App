import React from 'react';
import { Star, DollarSign, Users } from 'lucide-react';

interface JobFiltersProps {
  activeFilters: {
    matchQuality: boolean;
    competitiveness: boolean;
    salary: boolean;
  };
  onFilterChange: (filters: {
    matchQuality: boolean;
    competitiveness: boolean;
    salary: boolean;
  }) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ activeFilters, onFilterChange }) => {
  const toggleFilter = (filter: keyof typeof activeFilters) => {
    onFilterChange({
      ...activeFilters,
      [filter]: !activeFilters[filter],
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => toggleFilter('matchQuality')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilters.matchQuality
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Star className={`w-4 h-4 ${activeFilters.matchQuality ? 'fill-yellow-500' : ''}`} />
        Best Matches
      </button>

      <button
        onClick={() => toggleFilter('competitiveness')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilters.competitiveness
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Users className="w-4 h-4" />
        Low Competition
      </button>

      <button
        onClick={() => toggleFilter('salary')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilters.salary
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <DollarSign className="w-4 h-4" />
        Highest Salary
      </button>
    </div>
  );
};

export default JobFilters;