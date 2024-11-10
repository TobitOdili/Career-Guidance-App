import React from 'react';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  difficulty: string;
  type: string;
  certification: boolean;
  imageUrl: string;
  progress?: number;
  matchScore?: number;
  completedDate?: string;
  rating?: number;
}

interface CourseGridProps {
  courses: Course[];
  type: 'inProgress' | 'recommended' | 'completed';
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, type }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} type={type} />
      ))}
    </div>
  );
};

export default CourseGrid;