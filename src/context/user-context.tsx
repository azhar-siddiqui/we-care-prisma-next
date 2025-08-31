'use client';
import { LoggedInAdminUser, LoggedInUser } from '@/@types/login-user';
import { createContext, useContext, useMemo } from 'react';

// Define the shape of the context
interface UserContextType {
  user: LoggedInAdminUser | LoggedInUser | null;
}

interface UserProviderType {
  children: React.ReactNode;
  user: LoggedInAdminUser | LoggedInUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children, user }: UserProviderType) => {
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
