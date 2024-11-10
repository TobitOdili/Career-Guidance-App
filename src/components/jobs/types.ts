export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  salary: {
    range: string;
    score: 'low' | 'medium' | 'high';
  };
  competition: 'low' | 'medium' | 'high';
  skillMatch: {
    required: string[];
    userHas: string[];
  };
  description: string;
  excerpt: string;
  requirements: string[];
  applicationTips: string[];
  postedDate: string;
  benefits: string[];
  workType: 'remote' | 'hybrid' | 'onsite';
  companySize: string;
  industry: string;
  experienceLevel: string;
}