import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// success - status: 200 / 201 danger - status: 403 / 404 warning - status: 400 / 401 info: "user has logged out"
export type Kind = 'success' | 'danger' | 'warning' | 'info';

interface ToastItem {
  id: number;
  kind: Kind;
  message: string;
}
const ToastContext = createContext<(kind: Kind, message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((kind: Kind, message: string) => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), kind, message }]);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1100 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            bg={t.kind}
            autohide
            delay={4000}
            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          >
            <Toast.Body className={t.kind === 'info' || t.kind === 'warning' ? '' : 'text-white'}>
              {t.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);