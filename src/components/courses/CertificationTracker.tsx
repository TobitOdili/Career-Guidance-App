import React from 'react';
import { GraduationCap, Clock, Calendar, CheckCircle } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  imageUrl: string;
  earnedDate?: string;
  expiryDate?: string;
  progress?: number;
  requiredCourses?: string[];
}

interface CertificationTrackerProps {
  completed: Certification[];
  inProgress: Certification[];
  stats: {
    current: number;
    required: number;
  };
}

const CertificationTracker: React.FC<CertificationTrackerProps> = ({
  completed,
  inProgress,
  stats,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-800">
            {stats.current} of {stats.required} Required
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(stats.current / stats.required) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            In Progress
          </h3>
          <div className="space-y-4">
            {inProgress.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                </div>
                {cert.progress && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs font-medium text-gray-800">
                        {cert.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Completed
          </h3>
          <div className="space-y-4">
            {completed.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border rounded-lg hover:border-green-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationTracker;