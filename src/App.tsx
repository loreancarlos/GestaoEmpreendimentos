import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Clients } from './pages/Clients';
import { Developments } from './pages/Developments';
import { Sales } from './pages/Sales';
import { Users } from './pages/Users';
import { Commissions } from './pages/Commissions';
import { useAuthStore } from './store/authStore';
import { PrivateRoute } from './components/routing/PrivateRoute';

export function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={
            user?.role === 'broker' 
              ? <Navigate to="/commissions" replace /> 
              : <Navigate to="/clients" replace />
          } />
          
          {/* Routes for admin and regular users */}
          {user?.role !== 'broker' && (
            <>
              <Route path="clients" element={<Clients />} />
              <Route path="developments" element={<Developments />} />
              <Route path="sales" element={<Sales />} />
            </>
          )}

          {/* Route for brokers */}
          <Route
            path="commissions"
            element={
              <PrivateRoute requireBroker>
                <Commissions />
              </PrivateRoute>
            }
          />

          {/* Admin only route */}
          <Route
            path="users"
            element={
              <PrivateRoute requireAdmin>
                <Users />
              </PrivateRoute>
            }
          />
          
          <Route path="*" element={
            user?.role === 'broker'
              ? <Navigate to="/commissions" replace />
              : <Navigate to="/clients" replace />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}