import { create } from "zustand";
import type { AddToastInput, ToastItem } from "@/interfaces/toast.interface";

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: AddToastInput) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: ({ message, type = "info", duration = 3500 }) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));
