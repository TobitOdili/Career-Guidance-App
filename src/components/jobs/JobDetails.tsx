import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Job } from './types';

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
      <div className="prose max-w-none">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">About This Role</h3>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mt-1" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Benefits</h3>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <ExternalLink className="w-4 h-4 text-blue-500 mt-1" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Additional Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Work Type</p>
              <p className="font-medium text-gray-800 capitalize">{job.workType}</p>
            </div>
            <div>
              <p className="text-gray-600">Company Size</p>
              <p className="font-medium text-gray-800">{job.companySize}</p>
            </div>
            <div>
              <p className="text-gray-600">Industry</p>
              <p className="font-medium text-gray-800">{job.industry}</p>
            </div>
            <div>
              <p className="text-gray-600">Experience Level</p>
              <p className="font-medium text-gray-800">{job.experienceLevel}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;