import { Button as BootstrapButton, Spinner } from 'react-bootstrap';
import type { ButtonProps } from 'react-bootstrap';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

export function Button({ loading = false, disabled, children, ...rest}: AppButtonProps) {
    return (
      <BootstrapButton disabled={loading || disabled} {...rest}>
        {loading && (
          <Spinner as="span" animation="border" size="sm" className="me-2" />
        )}
        {children}
      </BootstrapButton>
    );
}