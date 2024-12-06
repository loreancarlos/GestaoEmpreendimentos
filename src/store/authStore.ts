import { create } from 'zustand';
import { User } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const { user, token } = await api.login(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    api.clearToken();
    set({ user: null, isAuthenticated: false });
  },
}));