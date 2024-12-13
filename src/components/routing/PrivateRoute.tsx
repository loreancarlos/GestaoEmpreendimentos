import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireBroker?: boolean;
}

export function PrivateRoute({ 
  children, 
  requireAdmin = false, 
  requireBroker = false 
}: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (requireBroker && user?.role !== 'broker') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}