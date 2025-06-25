
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user, userData } = useAuth();

  // Redirect if already logged in
  if (user && userData) {
    if (userData.ruolo === 'staff' && userData.approvato) {
      return <Navigate to="/dashboard" replace />;
    } else if (userData.ruolo === 'esploratore') {
      return <Navigate to="/profile" replace />;
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="bg-green-800 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
              <Home className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Scout App</h1>
            <p className="text-gray-600">Gestione Reparto</p>
          </div>
          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full bg-green-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 transform hover:scale-105 block text-center"
            >
              Accedi
            </Link>
            <Link
              to="/register"
              className="w-full bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105 block text-center"
            >
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
