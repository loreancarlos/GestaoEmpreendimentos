import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Building2, Users, FileText, Calendar, LogOut, UserCog } from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'border-indigo-500 text-gray-900'
      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Gestão de Loteamentos
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/clients"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                    '/clients'
                  )}`}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Clientes
                </Link>
                <Link
                  to="/developments"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                    '/developments'
                  )}`}
                >
                  <Building2 className="h-4 w-4 mr-1" />
                  Empreendimentos
                </Link>
                <Link
                  to="/receivables"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                    '/receivables'
                  )}`}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Recebíveis
                </Link>
                <Link
                  to="/calendar"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                    '/calendar'
                  )}`}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendário
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/users"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                      '/users'
                    )}`}
                  >
                    <UserCog className="h-4 w-4 mr-1" />
                    Usuários
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}