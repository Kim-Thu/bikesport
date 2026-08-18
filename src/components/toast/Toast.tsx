"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icon/Icon";
import type { ToastItem } from "@/interfaces/toast.interface";
import { useToastStore } from "@/stores/toast.store";

const TYPE_CLASS = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
} as const;

interface ToastProps {
  toast: ToastItem;
}

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = window.setTimeout(
      () => removeToast(toast.id),
      toast.duration ?? 3500,
    );

    return () => window.clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className={`flex items-start gap-3 rounded-md border p-3 ${TYPE_CLASS[toast.type]}`}
      role="status"
    >
      <p className="min-w-0 flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        className="shrink-0"
        aria-label="Đóng thông báo"
        onClick={() => removeToast(toast.id)}
      >
        <Icon name="close" className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
