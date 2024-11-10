import React, { useState, useMemo } from 'react';
import { useUser } from '../../contexts/UserContext';
import { CAREER_PATHS } from '../../types';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import CoverLetterModal from './CoverLetterModal';
import OptimizeResumeModal from './OptimizeResumeModal';
import { Job } from './types';

const JobsPage = () => {
  const { userData } = useUser();
  const careerInfo = CAREER_PATHS[userData.careerPath].specializations[userData.specialization];
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [expandedAIActions, setExpandedAIActions] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobForResume, setSelectedJobForResume] = useState<Job | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    matchQuality: true,
    competitiveness: false,
    salary: false,
  });

  // Mock data with expanded descriptions and requirements
  const jobs: Job[] = [
    {
      id: '1',
      title: `Senior ${careerInfo.title}`,
      company: 'Tomahawk Digital',
      location: userData.location || 'Remote',
      matchScore: 92,
      salary: {
        range: careerInfo.averageSalary,
        score: 'high',
      },
      competition: 'medium',
      skillMatch: {
        required: careerInfo.requiredSkills,
        userHas: userData.skills,
      },
      description: 'Leading digital transformation initiatives and mentoring junior team members in a fast-paced, innovative environment...',
      excerpt: 'Senior role focused on technical leadership and mentoring',
      requirements: [
        ...careerInfo.requiredSkills,
        '5+ years of professional experience',
        'Strong system design and architecture skills',
        'Experience with microservices architecture',
        'Track record of mentoring junior developers',
      ],
      applicationTips: [
        'Highlight your experience with our tech stack',
        'Include examples of systems you\'ve architected',
        'Showcase your mentorship experience',
      ],
      postedDate: '2024-03-15',
      benefits: [
        'Competitive salary and equity package',
        'Remote-first culture',
        'Learning and development budget',
        'Premium health insurance',
        'Flexible working hours',
      ],
      workType: 'remote',
      experienceLevel: 'Senior',
      industry: 'Technology',
      companySize: '50-200 employees'
    },
    {
      id: '2',
      title: careerInfo.title,
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      matchScore: 88,
      salary: {
        range: careerInfo.averageSalary,
        score: 'high',
      },
      competition: 'high',
      skillMatch: {
        required: careerInfo.requiredSkills.slice(0, 4),
        userHas: userData.skills,
      },
      description: 'Join our innovative team building next-generation solutions using cutting-edge technologies...',
      excerpt: 'Mid-level position focused on product development',
      requirements: [
        ...careerInfo.requiredSkills.slice(0, 4),
        '3+ years of professional experience',
        'Strong problem-solving skills',
        'Experience with agile development',
      ],
      applicationTips: [
        'Share your GitHub profile',
        'Include your contribution to open source',
        'Highlight your problem-solving approach',
      ],
      postedDate: '2024-03-16',
      benefits: [
        'Competitive compensation',
        'Stock options',
        'Health and wellness benefits',
        'Hybrid work model',
        'Professional development opportunities',
      ],
      workType: 'hybrid',
      experienceLevel: 'Mid-Level',
      industry: 'Technology',
      companySize: '1000+ employees'
    },
  ];

  const sortJobs = (jobsToSort: Job[]) => {
    if (activeFilters.matchQuality) {
      return [...jobsToSort].sort((a, b) => b.matchScore - a.matchScore);
    }
    if (activeFilters.competitiveness) {
      return [...jobsToSort].sort((a, b) => {
        const competitionScore = { low: 3, medium: 2, high: 1 };
        return competitionScore[a.competition] - competitionScore[b.competition];
      });
    }
    if (activeFilters.salary) {
      return [...jobsToSort].sort((a, b) => {
        const salaryScore = { high: 3, medium: 2, low: 1 };
        return salaryScore[b.salary.score] - salaryScore[a.salary.score];
      });
    }
    return jobsToSort;
  };

  const sortedJobs = useMemo(() => sortJobs(jobs), [jobs, activeFilters]);

  const handleJobClick = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleToggleAIActions = (jobId: string) => {
    setExpandedAIActions(expandedAIActions === jobId ? null : jobId);
  };

  const handleGenerateCoverLetter = (job: Job) => {
    setSelectedJob(job);
  };

  const handleGenerateInterviewQuestions = (job: Job) => {
    // Implementation for interview questions
  };

  const handleOptimizeResume = (job: Job) => {
    setSelectedJobForResume(job);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Best {careerInfo.title} Opportunities
        </h1>
        <JobFilters
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      </div>

      <div className="space-y-4">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            expandedJob={expandedJob}
            expandedAIActions={expandedAIActions}
            onToggleExpand={handleJobClick}
            onToggleAIActions={handleToggleAIActions}
            onGenerateCoverLetter={handleGenerateCoverLetter}
            onGenerateInterviewQuestions={handleGenerateInterviewQuestions}
            onOptimizeResume={handleOptimizeResume}
          />
        ))}
      </div>

      {selectedJob && (
        <CoverLetterModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          missingSkills={selectedJob.requirements.filter(
            req => !userData.skills.includes(req)
          )}
        />
      )}

      {selectedJobForResume && (
        <OptimizeResumeModal
          job={selectedJobForResume}
          onClose={() => setSelectedJobForResume(null)}
        />
      )}
    </div>
  );
};

export default JobsPage;