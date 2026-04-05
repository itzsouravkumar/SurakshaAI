import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_WORKER } from '@/constants/mockData';

export interface WorkerUser {
  id: string;
  name: string;
  phone: string;
  department: string;   // platform name (Swiggy, Zomato, etc.)
  shift: string;        // working hours
  site: string;         // delivery zone
  joinDate: string;
  avatarInitials: string;
  securityScore: number;  // risk score
  tasksCompleted: number; // deliveries completed
  alertsHandled: number;  // claims settled
  reportsFiledCount: number;
}

interface AuthContextType {
  user: WorkerUser | null;
  isLoggedIn: boolean;
  isOnboarded: boolean;
  login: (userData?: Partial<WorkerUser>) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WorkerUser | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const login = (userData?: Partial<WorkerUser>) => {
    // Merge provided user data with mock defaults
    setUser({ ...MOCK_WORKER, ...userData });
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  const logout = () => {
    setUser(null);
    setIsOnboarded(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isOnboarded,
        login,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
