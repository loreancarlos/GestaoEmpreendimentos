import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface AuthRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthRoute({ children, requireAuth = true }: AuthRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Se requer autenticação e usuário não está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se não requer autenticação e usuário está autenticado (ex: página de login)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
