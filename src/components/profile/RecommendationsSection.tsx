import React from 'react';
import { BookOpen, Briefcase, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  isPremium: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl?: string;
}

interface RecommendationsSectionProps {
  courses: Course[];
  jobs: Job[];
  mentors: Mentor[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ courses, jobs, mentors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Personalized Recommendations</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-500" />
            Recommended Courses
          </h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 border rounded-lg hover:border-green-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{course.title}</h4>
                  {course.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{course.provider}</p>
                <p className="text-xs text-gray-500">{course.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" />
            Matching Jobs
          </h3>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {job.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-gray-500">{job.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            Suggested Mentors
          </h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="p-4 border rounded-lg hover:border-purple-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                    {mentor.imageUrl ? (
                      <img
                        src={mentor.imageUrl}
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{mentor.name}</h4>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <p className="text-xs text-gray-500">{mentor.company}</p>
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

export default RecommendationsSection;