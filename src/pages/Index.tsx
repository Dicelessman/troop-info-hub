
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import HomePage from './HomePage';

const Index: React.FC = () => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="text-lg font-medium">Caricamento...</span>
        </div>
      </div>
    );
  }

  // Redirect authenticated users based on their role
  if (user && userData) {
    if (userData.ruolo === 'staff' && userData.approvato) {
      return <Navigate to="/dashboard" replace />;
    } else if (userData.ruolo === 'esploratore') {
      return <Navigate to="/profile" replace />;
    } else if (userData.ruolo === 'staff' && !userData.approvato) {
      // Staff not approved - sign out and show home page
      return <HomePage />;
    }
  }

  return <HomePage />;
};

export default Index;
