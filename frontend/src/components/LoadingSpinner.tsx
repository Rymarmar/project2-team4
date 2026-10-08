import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  label?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ label = 'Loading...', fullPage = false }: LoadingSpinnerProps) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center gap-2 ${
        fullPage ? 'min-vh-100' : 'py-5'
      }`}
    >
      <Spinner animation="border" role="status" variant="primary" />
      <span className="text-muted">{label}</span>
    </div>
  );
}