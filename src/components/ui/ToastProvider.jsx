import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/cn.js';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const toneClasses = {
  success: 'border-primary-500/30 text-primary-700 dark:text-primary-200',
  error: 'border-danger-500/30 text-danger-600 dark:text-danger-400',
  info: 'border-info-500/30 text-info-600 dark:text-info-400',
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, tone = 'success') => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, message, tone }]);
      setTimeout(() => removeToast(id), 5000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3">
          {toasts.map((toast) => {
            const Icon = icons[toast.tone];
            return (
              <div
                key={toast.id}
                role="status"
                className={cn(
                  'flex items-start gap-3 rounded-xl border bg-surface-elevated p-4 shadow-elevated animate-slide-up',
                  toneClasses[toast.tone],
                )}
              >
                <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p className="flex-1 text-sm text-primary-body">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  aria-label="Fermer"
                  className="text-muted hover:text-primary-body"
                >
                  <X className="size-4" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
