import React from 'react';
import ProfileHeader from './ProfileHeader';
import SkillsSection from './SkillsSection';
import AchievementsSection from './AchievementsSection';
import RecommendationsSection from './RecommendationsSection';
import { useUser } from '../../contexts/UserContext';
import { CAREER_PATHS } from '../../types';

const ProfilePage = () => {
  const { userData } = useUser();
  const careerInfo = CAREER_PATHS[userData.careerPath].specializations[userData.specialization];

  // Mock data - In a real app, this would come from an API
  const mockData = {
    achievements: {
      items: [
        {
          id: '1',
          title: `${careerInfo.title} Fundamentals`,
          description: `Completed ${careerInfo.title} basics course`,
          date: '2024-03-15',
          icon: 'trophy' as const,
        },
        {
          id: '2',
          title: 'First Project',
          description: 'Successfully completed first milestone project',
          date: '2024-03-10',
          icon: 'award' as const,
        },
      ],
      nextMilestone: {
        title: `${careerInfo.title} Expert`,
        description: `Complete Advanced ${careerInfo.title} module`,
        progress: 75,
      },
    },
    recommendations: {
      courses: [
        {
          id: '1',
          title: `Advanced ${careerInfo.title} Patterns`,
          provider: 'Frontend Masters',
          duration: '6 hours',
          isPremium: true,
        },
        {
          id: '2',
          title: careerInfo.certifications[0],
          provider: 'Industry Standard',
          duration: '4 hours',
          isPremium: false,
        },
      ],
      jobs: [
        {
          id: '1',
          title: `Senior ${careerInfo.title}`,
          company: 'TechCorp Inc.',
          location: userData.location || 'Remote',
          matchScore: 92,
        },
        {
          id: '2',
          title: careerInfo.title,
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          matchScore: 85,
        },
      ],
      mentors: [
        {
          id: '1',
          name: 'Alex Rivera',
          role: `Senior ${careerInfo.title}`,
          company: 'Google',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        },
        {
          id: '2',
          name: 'Emily Wong',
          role: 'Tech Lead',
          company: 'Microsoft',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        },
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProfileHeader
        name={userData.name}
        role={careerInfo.title}
        progress={65}
        imageUrl={undefined}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SkillsSection
            currentSkills={careerInfo.requiredSkills.map(skill => ({
              name: skill,
              level: userData.experience,
              inProgress: false
            }))}
            suggestedSkills={careerInfo.tools}
          />
          <RecommendationsSection
            courses={mockData.recommendations.courses}
            jobs={mockData.recommendations.jobs}
            mentors={mockData.recommendations.mentors}
          />
        </div>
        <div className="space-y-6">
          <AchievementsSection
            achievements={mockData.achievements.items}
            nextMilestone={mockData.achievements.nextMilestone}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;