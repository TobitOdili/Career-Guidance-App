import React from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  careerPath: CareerPathType;
  specialization: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  interests: string[];
  preferredLanguage: 'en' | 'es' | 'fr';
  isPremium: boolean;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export type CareerPathType = 'engineering' | 'design' | 'management';

interface CareerSpecialization {
  title: string;
  description: string;
  requiredSkills: string[];
  tools: string[];
  certifications: string[];
  averageSalary: string;
}

interface CareerPathInfo {
  title: string;
  description: string;
  specializations: {
    [key: string]: CareerSpecialization;
  };
}

export type CareerPathsType = {
  [K in CareerPathType]: CareerPathInfo;
};

export const CAREER_PATHS: CareerPathsType = {
  engineering: {
    title: 'Software Engineering',
    description: 'Build and maintain software applications and systems',
    specializations: {
      web: {
        title: 'Web Developer',
        description: 'Create responsive and dynamic web applications',
        requiredSkills: [
          'HTML/CSS',
          'JavaScript',
          'React',
          'Node.js',
          'SQL',
          'Git'
        ],
        tools: [
          'VS Code',
          'Chrome DevTools',
          'GitHub',
          'Terminal'
        ],
        certifications: [
          'AWS Certified Developer',
          'Meta Frontend Developer'
        ],
        averageSalary: '$85,000 - $130,000'
      },
      mobile: {
        title: 'Mobile Developer',
        description: 'Build native and cross-platform mobile applications',
        requiredSkills: [
          'React Native',
          'Swift/iOS',
          'Kotlin/Android',
          'Mobile UI/UX',
          'API Integration',
          'State Management'
        ],
        tools: [
          'Xcode',
          'Android Studio',
          'Expo',
          'Firebase'
        ],
        certifications: [
          'Apple Developer Certification',
          'Google Associate Android Developer'
        ],
        averageSalary: '$90,000 - $140,000'
      },
      backend: {
        title: 'Backend Developer',
        description: 'Design and implement server-side applications and APIs',
        requiredSkills: [
          'Node.js',
          'Python',
          'Databases',
          'API Design',
          'Cloud Services',
          'Security'
        ],
        tools: [
          'Docker',
          'AWS/Azure',
          'PostgreSQL',
          'Redis'
        ],
        certifications: [
          'AWS Solutions Architect',
          'MongoDB Developer'
        ],
        averageSalary: '$95,000 - $150,000'
      }
    }
  },
  design: {
    title: 'Design',
    description: 'Create beautiful and functional digital experiences',
    specializations: {
      ui_ux: {
        title: 'UI/UX Designer',
        description: 'Design user interfaces and experiences',
        requiredSkills: [
          'User Research',
          'Wireframing',
          'Prototyping',
          'Visual Design',
          'Design Systems',
          'User Testing'
        ],
        tools: [
          'Figma',
          'Adobe XD',
          'Sketch',
          'InVision'
        ],
        certifications: [
          'Google UX Design Certificate',
          'Interaction Design Foundation'
        ],
        averageSalary: '$75,000 - $120,000'
      },
      product: {
        title: 'Product Designer',
        description: 'Design end-to-end product experiences',
        requiredSkills: [
          'Product Strategy',
          'Information Architecture',
          'Interaction Design',
          'Visual Design',
          'Prototyping',
          'User Research'
        ],
        tools: [
          'Figma',
          'Framer',
          'Principle',
          'ProtoPie'
        ],
        certifications: [
          'Professional Product Designer',
          'Design Leadership'
        ],
        averageSalary: '$85,000 - $140,000'
      },
      motion: {
        title: 'Motion Designer',
        description: 'Create engaging animations and visual effects',
        requiredSkills: [
          'Animation Principles',
          '2D/3D Animation',
          'Visual Effects',
          'Storyboarding',
          'Video Editing',
          'Sound Design'
        ],
        tools: [
          'After Effects',
          'Cinema 4D',
          'Premiere Pro',
          'Blender'
        ],
        certifications: [
          'Adobe Certified Professional',
          'Autodesk Certified Professional'
        ],
        averageSalary: '$70,000 - $110,000'
      }
    }
  },
  management: {
    title: 'Management',
    description: 'Lead product development and strategy',
    specializations: {
      product: {
        title: 'Product Manager',
        description: 'Define and execute product strategy',
        requiredSkills: [
          'Product Strategy',
          'User Stories',
          'Market Research',
          'Data Analysis',
          'Agile/Scrum',
          'Stakeholder Management'
        ],
        tools: [
          'Jira',
          'Confluence',
          'Amplitude',
          'Mixpanel'
        ],
        certifications: [
          'Product Management Certificate (PMC)',
          'Scrum Product Owner'
        ],
        averageSalary: '$100,000 - $160,000'
      },
      technical: {
        title: 'Technical Project Manager',
        description: 'Lead technical projects and engineering teams',
        requiredSkills: [
          'Technical Planning',
          'Risk Management',
          'Agile Methodologies',
          'Team Leadership',
          'Budgeting',
          'Vendor Management'
        ],
        tools: [
          'Jira',
          'GitHub',
          'Confluence',
          'MS Project'
        ],
        certifications: [
          'PMP Certification',
          'Scrum Master'
        ],
        averageSalary: '$95,000 - $155,000'
      },
      delivery: {
        title: 'Delivery Manager',
        description: 'Ensure successful project delivery and team performance',
        requiredSkills: [
          'Agile Delivery',
          'Team Coaching',
          'Process Improvement',
          'Risk Management',
          'Stakeholder Management',
          'Resource Planning'
        ],
        tools: [
          'Jira',
          'Trello',
          'Confluence',
          'Monday.com'
        ],
        certifications: [
          'Agile Certified Practitioner',
          'PRINCE2 Practitioner'
        ],
        averageSalary: '$90,000 - $150,000'
      }
    }
  }
};