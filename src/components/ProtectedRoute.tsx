
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireStaff = false }) => {
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

  if (!user || !userData) {
    return <Navigate to="/login" replace />;
  }

  if (requireStaff && (userData.ruolo !== 'staff' || !userData.approvato)) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
