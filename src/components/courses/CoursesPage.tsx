import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronRight, ExternalLink, Clock } from 'lucide-react';

const CoursesPage = () => {
  const [showPreviousTasks, setShowPreviousTasks] = useState(false);

  // Mock data - In a real app, this would come from an API
  const mockData = {
    weeklyGoal: {
      title: "Complete React Fundamentals & Start Backend Basics",
      progress: 60,
      dueDate: "March 24, 2024"
    },
    todaysTasks: [
      {
        id: '1',
        title: 'Complete post-course evaluation',
        course: 'React Fundamentals',
        platform: 'Frontend Masters',
        link: 'https://frontendmasters.com/courses/react-fundamentals',
        estimatedTime: '15 min',
        priority: 'high',
        relatedTo: 'certification'
      },
      {
        id: '2',
        title: 'Watch "Introduction to Express.js"',
        course: 'Node.js Basics',
        platform: 'egghead.io',
        link: 'https://egghead.io/nodejs-basics',
        estimatedTime: '45 min',
        priority: 'medium',
        relatedTo: 'job:TomahawkDev'
      }
    ],
    previousTasks: [
      {
        id: '3',
        title: 'Complete React Hooks Exercise',
        course: 'React Fundamentals',
        platform: 'Frontend Masters',
        completed: true,
        date: '2024-03-15'
      },
      {
        id: '4',
        title: 'Submit React Router Project',
        course: 'React Fundamentals',
        platform: 'Frontend Masters',
        completed: false,
        date: '2024-03-14',
        blocking: ['1']
      }
    ],
    ongoingCourses: [
      {
        id: '5',
        title: 'Node.js Microservices',
        platform: 'Udemy',
        progress: 45,
        nextAction: 'Complete Module 3: API Gateway',
        relatedTo: 'job:TomahawkDev',
        dueDate: '2024-03-25'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Weekly Goal */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{mockData.weeklyGoal.title}</h1>
            <p className="text-sm text-gray-600 mt-1">Due {mockData.weeklyGoal.dueDate}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-800">{mockData.weeklyGoal.progress}%</span>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${mockData.weeklyGoal.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Learning Tasks</h2>
        <div className="space-y-4">
          {mockData.todaysTasks.map(task => (
            <div key={task.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.course} • {task.platform}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {task.estimatedTime}
                    </span>
                    {task.relatedTo.startsWith('job:') && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Job Required
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <button
          onClick={() => setShowPreviousTasks(!showPreviousTasks)}
          className="flex items-center gap-2 w-full text-left"
        >
          <h2 className="text-lg font-semibold text-gray-800">Previous Tasks</h2>
          {showPreviousTasks ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {showPreviousTasks && (
          <div className="space-y-4 mt-4">
            {mockData.previousTasks.map(task => (
              <div
                key={task.id}
                className={`border rounded-lg p-4 ${
                  task.completed ? 'bg-gray-50' : 'hover:border-red-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      task.completed ? 'text-gray-600' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.course} • {task.platform}
                    </p>
                    {!task.completed && task.blocking && (
                      <p className="text-sm text-red-600 mt-2">
                        Required for today's tasks
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">
                    {new Date(task.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ongoing Courses */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ongoing Courses</h2>
        <div className="space-y-4">
          {mockData.ongoingCourses.map(course => (
            <div key={course.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.platform}</p>
                  <p className="text-sm text-blue-600 mt-2">{course.nextAction}</p>
                  {course.relatedTo.startsWith('job:') && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-2">
                      Required for job application
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-800">{course.progress}%</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Due {new Date(course.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;