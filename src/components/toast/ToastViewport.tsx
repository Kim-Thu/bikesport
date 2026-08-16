"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icon/Icon";
import { useToastStore } from "@/stores/toast.store";

const TYPE_CLASS = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
} as const;

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => removeToast(toast.id), toast.duration ?? 3500),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [toasts, removeToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-md border p-3 shadow-lg ${TYPE_CLASS[toast.type]}`}
          role="status"
        >
          <p className="min-w-0 flex-1 text-sm font-medium">{toast.message}</p>
          <button type="button" className="shrink-0" aria-label="Đóng thông báo" onClick={() => removeToast(toast.id)}>
            <Icon name="close" className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
