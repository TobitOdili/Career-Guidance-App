import React from 'react';
import { Camera, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  role: string;
  progress: number;
  imageUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, role, progress, imageUrl }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Camera className="w-8 h-8" />
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
              {role}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Career Progress</span>
              <span className="text-sm font-medium text-gray-800">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;