export interface ResumeData {
  full_name: string;
  contact_email: string;
  phone_number: string;
  location: string;
  summary: string;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface WorkExperience {
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  field_of_study: string;
  institution: string;
  graduation_date: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'date' | 'array' | 'experience';
  field: string;
  placeholder?: string;
  required?: boolean;
  aiPrompt?: string;
  dependsOn?: string;
}

export interface ResumeBuilderStep {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}