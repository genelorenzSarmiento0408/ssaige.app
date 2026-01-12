"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  duration?: number; // ms
  onClose?: () => void;
};

export default function Toast({
  message,
  duration = 3500,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs">
        {message}
      </div>
    </div>
  );
}
