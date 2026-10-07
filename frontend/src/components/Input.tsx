import type { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <Form.Group className="mb-3" controlId={rest.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control isInvalid={!!error} {...rest} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}