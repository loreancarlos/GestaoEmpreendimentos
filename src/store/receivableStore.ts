import { create } from "zustand";
import { Receivable } from "../types";
import { api } from "../services/api";

interface ReceivableState {
  receivables: Receivable[];
  loading: boolean;
  error: string | null;
  fetchReceivables: () => Promise<void>;
  addReceivable: (receivable: Omit<Receivable, "id">) => Promise<void>;
  updateReceivable: (
    id: string,
    receivable: Partial<Receivable>
  ) => Promise<Receivable>;
  deleteReceivable: (id: string) => Promise<void>;
  updateInstallmentStatus: (
    receivableId: string,
    installmentNumber: number,
    updates: { billIssued?: boolean; billPaid?: boolean }
  ) => Promise<void>;
}

export const useReceivableStore = create<ReceivableState>((set, get) => ({
  receivables: [],
  loading: false,
  error: null,
  fetchReceivables: async () => {
    try {
      set({ loading: true, error: null });
      const receivables = await api.getReceivables();
      set({ receivables, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch receivables", loading: false });
    }
  },
  addReceivable: async (receivableData) => {
    try {
      set({ loading: true, error: null });
      const receivable = await api.createReceivable(receivableData);
      set({
        receivables: [...get().receivables, receivable],
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to create receivable", loading: false });
      throw error;
    }
  },
  updateReceivable: async (id, receivableData) => {
    try {
      set({ loading: true, error: null });
      const updatedReceivable = await api.updateReceivable(id, receivableData);
      set({
        receivables: get().receivables.map((receivable) =>
          receivable.id === id ? updatedReceivable : receivable
        ),
        loading: false,
      });
      return updatedReceivable;
    } catch (error) {
      set({ error: "Failed to update receivable", loading: false });
      throw error;
    }
  },
  deleteReceivable: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteReceivable(id);
      set({
        receivables: get().receivables.filter(
          (receivable) => receivable.id !== id
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to delete receivable", loading: false });
      throw error;
    }
  },
  updateInstallmentStatus: async (receivableId, installmentNumber, updates) => {
    try {
      set({ loading: true, error: null });
      const updatedReceivable = await api.updateInstallmentStatus(
        receivableId,
        installmentNumber,
        updates as { billIssued: boolean; billPaid: boolean }
      );
      set({
        receivables: get().receivables.map((receivable) =>
          receivable.id === receivableId ? updatedReceivable : receivable
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to update installment status", loading: false });
      throw error;
    }
  },
}));