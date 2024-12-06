import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Clients } from './pages/Clients';
import { Developments } from './pages/Developments';
import { Receivables } from './pages/Receivables';
import { Calendar } from './pages/Calendar';
import { Users } from './pages/Users';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function App() {
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
          <Route index element={<Navigate to="/clients" />} />
          <Route path="clients" element={<Clients />} />
          <Route path="developments" element={<Developments />} />
          <Route path="receivables" element={<Receivables />} />
          <Route path="calendar" element={<Calendar />} />
          <Route
            path="users"
            element={
              <PrivateRoute requireAdmin>
                <Users />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;