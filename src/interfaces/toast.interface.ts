export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface AddToastInput {
  message: string;
  type?: ToastType;
  duration?: number;
}
