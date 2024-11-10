import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Bot, 
  Plus, 
  Bell,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Star,
  Clock,
  Target,
  Trophy,
  ArrowUpRight
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { CAREER_PATHS } from '../types';
import ResumeBuilder from './resume/ResumeBuilder';

interface DashboardProps {
  userData: any;
  onRewatch: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onRewatch }) => {
  const [showResumeBuilder, setShowResumeBuilder] = React.useState(false);
  const navigate = useNavigate();
  const careerInfo = CAREER_PATHS[userData.careerPath].specializations[userData.specialization];

  const notifications = [
    {
      id: '1',
      title: 'New job match found',
      description: 'A new Senior Developer position matches your profile',
      time: '2 hours ago',
      type: 'job'
    },
    {
      id: '2',
      title: 'Course completion reminder',
      description: 'Continue your React Advanced Patterns course',
      time: '1 day ago',
      type: 'course'
    },
    {
      id: '3',
      title: 'Certification milestone',
      description: "You're 80% through your certification path",
      time: '2 days ago',
      type: 'certification'
    }
  ];

  const mockData = {
    progress: {
      courses: 4,
      skills: careerInfo.requiredSkills.length,
      currentSkills: 2,
    },
    nextEvents: [
      {
        id: '1',
        title: 'Mock Interview Practice',
        date: '2024-03-20',
        time: '2:00 PM',
        type: 'interview',
      },
      {
        id: '2',
        title: 'Career Path Review',
        date: '2024-03-22',
        time: '11:00 AM',
        type: 'meeting',
      },
    ],
    learningStreak: {
      current: 5,
      longest: 12,
      thisWeek: 4,
    }
  };

  if (showResumeBuilder) {
    return <ResumeBuilder onClose={() => setShowResumeBuilder(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-gray-600">Continue your journey to become a {careerInfo.title}</p>
          </div>
          <button
            onClick={onRewatch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Bot className="w-4 h-4" />
            Rewatch Onboarding
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Resumes Card */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-800">Resumes</h3>
                  </div>
                  <button
                    onClick={() => setShowResumeBuilder(true)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Create and manage your professional resumes</p>
                <button
                  onClick={() => setShowResumeBuilder(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Resume
                </button>
              </div>

              {/* Cover Letters Card */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-800">Cover Letters</h3>
                  </div>
                  <button
                    onClick={() => navigate('/jobs')}
                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Generate tailored cover letters for job applications</p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Updates</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'job'
                      ? 'bg-blue-100 text-blue-600'
                      : notification.type === 'course'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {notification.type === 'job' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : notification.type === 'course' ? (
                      <GraduationCap className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{notification.title}</h3>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Overview</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockData.progress.courses}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Courses Completed</p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockData.progress.currentSkills}/{mockData.progress.skills}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Skills Acquired</p>
              </div>
              <div className="p-4 border rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-800">
                    {mockData.learningStreak.current}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/jobs')}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <span className="text-sm text-gray-800">Browse Jobs</span>
                <Briefcase className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-green-500 transition-colors"
              >
                <span className="text-sm text-gray-800">Continue Learning</span>
                <GraduationCap className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/career')}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-purple-500 transition-colors"
              >
                <span className="text-sm text-gray-800">View Career Path</span>
                <Target className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;