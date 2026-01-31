import { useEffect } from 'react';

export type ToastMessage = {
  id: number;
  message: string;
};

type ToastProps = {
  message: ToastMessage | null;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onClose, 2500);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast">
      <span>{message.message}</span>
      <button type="button" onClick={onClose} aria-label="Close toast">
        ×
      </button>
    </div>
  );
}
