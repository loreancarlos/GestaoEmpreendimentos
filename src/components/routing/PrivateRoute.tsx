import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // Se não estiver autenticado, redireciona para o login mantendo a URL original
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Se precisar ser admin e não for, redireciona para a home
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Se precisar ser corretor e não for, redireciona para a home
  if (requireBroker && user?.role !== 'broker') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}
