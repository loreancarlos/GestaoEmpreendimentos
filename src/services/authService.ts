import { api } from './api';
import { User } from '../types';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthError {
  message: string;
  code: 'INVALID_CREDENTIALS' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw { message: 'Email ou senha inválidos', code: 'INVALID_CREDENTIALS' } as AuthError;
        }
        if (error.message.includes('fetch')) {
          throw { message: 'Erro de conexão com o servidor', code: 'NETWORK_ERROR' } as AuthError;
        }
      }
      throw { message: 'Erro desconhecido', code: 'UNKNOWN_ERROR' } as AuthError;
    }
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.request<void>('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Falha ao alterar a senha: ' + error.message);
      }
      throw new Error('Falha ao alterar a senha');
    }
  }
}
