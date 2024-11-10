import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/profile/ProfilePage';
import CoursesPage from './components/courses/CoursesPage';
import JobsPage from './components/jobs/JobsPage';
import CareerPathPage from './components/career/CareerPathPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import { AIProvider } from './components/ai/AIProvider';
import AISetup from './components/ai/AISetup';
import AICompanion from './components/ai/AICompanion';
import { UserProfile } from './types';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile' | 'courses' | 'jobs' | 'career'>('dashboard');
  const [userData, setUserData] = useState<UserProfile>({
    id: '1',
    name: '',
    email: '',
    careerPath: 'engineering',
    specialization: 'web',
    experience: 'beginner',
    skills: [],
    interests: [],
    preferredLanguage: 'en',
    isPremium: false
  });

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
    setIsOnboarded(true);
  };

  const handleRewatchOnboarding = () => {
    setIsOnboarded(false);
  };

  const updateUserData = (data: Partial<UserProfile>) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <Router>
      <LanguageProvider>
        <UserProvider userData={userData} updateUserData={updateUserData}>
          <AIProvider>
            <div className="min-h-screen bg-gray-50">
              <AISetup />
              <AICompanion />
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-blue-600">TechPath</h1>
                  {isOnboarded && (
                    <nav className="flex gap-6">
                      <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className={`${
                          currentPage === 'dashboard' 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => setCurrentPage('courses')}
                        className={`${
                          currentPage === 'courses' 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        Courses
                      </button>
                      <button 
                        onClick={() => setCurrentPage('jobs')}
                        className={`${
                          currentPage === 'jobs' 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        Jobs
                      </button>
                      <button 
                        onClick={() => setCurrentPage('career')}
                        className={`${
                          currentPage === 'career' 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        Career Path
                      </button>
                      <button 
                        onClick={() => setCurrentPage('profile')}
                        className={`${
                          currentPage === 'profile' 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        Profile
                      </button>
                    </nav>
                  )}
                </div>
              </header>

              <main className="py-8">
                {!isOnboarded ? (
                  <Onboarding onComplete={handleOnboardingComplete} />
                ) : currentPage === 'dashboard' ? (
                  <Dashboard userData={userData} onRewatch={handleRewatchOnboarding} />
                ) : currentPage === 'profile' ? (
                  <ProfilePage />
                ) : currentPage === 'jobs' ? (
                  <JobsPage />
                ) : currentPage === 'career' ? (
                  <CareerPathPage />
                ) : (
                  <CoursesPage />
                )}
              </main>
            </div>
          </AIProvider>
        </UserProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;