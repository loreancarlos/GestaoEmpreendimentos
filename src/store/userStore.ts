import { create } from "zustand";
import { User } from "../types";
import { api } from "../services/api";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, "id" | "createdAt">) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const users = await api.getUsers();
      set({ users, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
    }
  },
  addUser: async (userData) => {
    try {
      set({ loading: true, error: null });
      const user = await api.createUser(userData);
      set({ users: [...get().users, user], loading: false });
    } catch (error) {
      set({ error: "Failed to create user", loading: false });
      throw error;
    }
  },
  updateUser: async (id, userData) => {
    try {
      set({ loading: true, error: null });
      const updatedUser = await api.updateUser(id, userData);
      set({
        users: get().users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to update user", loading: false });
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteUser(id);
      const updatedUsers = get().users.filter((user) => user.id !== id);
      set({ users: updatedUsers, loading: false });
    } catch (error) {
      set({ error: "Failed to delete user", loading: false });
      throw error;
    }
  },
  toggleUserStatus: async (id) => {
    try {
      set({ loading: true, error: null });
      const updatedUser = await api.toggleUserStatus(id);
      set({
        users: get().users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to toggle user status", loading: false });
      throw error;
    }
  },
}));
