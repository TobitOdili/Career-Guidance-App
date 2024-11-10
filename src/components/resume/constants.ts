import { ResumeBuilderStep } from './types';

export const RESUME_BUILDER_STEPS: ResumeBuilderStep[] = [
  {
    id: 'intro',
    title: 'Introduction',
    description: 'Let\'s start with your basic information',
    questions: [
      {
        id: 'name',
        text: 'What is your full name?',
        type: 'text',
        field: 'full_name',
        required: true,
      },
      {
        id: 'email',
        text: 'What is your email address?',
        type: 'text',
        field: 'contact_email',
        required: true,
      },
      {
        id: 'phone',
        text: 'What is your phone number?',
        type: 'text',
        field: 'phone_number',
        required: true,
      },
      {
        id: 'location',
        text: 'Where are you located?',
        type: 'text',
        field: 'location',
        required: true,
      },
    ],
  },
  {
    id: 'summary',
    title: 'Professional Summary',
    description: 'Tell us about your career goals and expertise',
    questions: [
      {
        id: 'summary',
        text: 'Write a brief professional summary',
        type: 'textarea',
        field: 'summary',
        required: true,
        aiPrompt: 'Help me write a professional summary that highlights my experience and career goals.',
      },
    ],
  },
  {
    id: 'experience',
    title: 'Work Experience',
    description: 'Share your work history',
    questions: [
      {
        id: 'work_experience',
        text: 'Add your work experience',
        type: 'experience',
        field: 'work_experience',
        required: true,
        aiPrompt: 'Help me describe my work responsibilities in a professional manner.',
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Tell us about your educational background',
    questions: [
      {
        id: 'education',
        text: 'Add your education history',
        type: 'education',
        field: 'education',
        required: true,
      },
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'List your technical and professional skills',
    questions: [
      {
        id: 'skills',
        text: 'What are your key skills?',
        type: 'array',
        field: 'skills',
        required: true,
        aiPrompt: 'Suggest relevant skills based on my experience and career path.',
      },
    ],
  },
];