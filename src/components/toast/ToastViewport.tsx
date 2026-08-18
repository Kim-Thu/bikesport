"use client";

import { Toast } from "@/components/toast/Toast";
import { useToastStore } from "@/stores/toast.store";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);

  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
