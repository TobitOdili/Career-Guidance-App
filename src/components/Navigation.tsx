import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <nav className="fixed top-0 w-full bg-indigo-600 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-indigo-700">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">TechPath</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
              className="bg-indigo-700 text-white rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            
            <button className="p-2 rounded-full hover:bg-indigo-700">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-indigo-700">
              <User className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-indigo-700">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};