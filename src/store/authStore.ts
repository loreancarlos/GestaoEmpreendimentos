import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const { user, token } = await api.login(email, password);
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        api.clearToken();
        set({ user: null, token: null, isAuthenticated: false });
      },
      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          await api.changePassword(currentPassword, newPassword);
        } catch (error) {
          throw new Error('Falha ao alterar a senha');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
