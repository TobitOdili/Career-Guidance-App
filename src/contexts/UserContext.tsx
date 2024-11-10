import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { UserProfile } from '../types';

interface UserContextType {
  userData: UserProfile;
  updateUserData: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  userData: UserProfile;
  updateUserData: (data: Partial<UserProfile>) => void;
}> = ({ children, userData, updateUserData }) => {
  const { getUserByEmail } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId && userData.email) {
          const existingUser = await getUserByEmail(userData.email);
          if (existingUser) {
            updateUserData({ id: existingUser.id });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userData.email]);

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};