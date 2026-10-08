import { useId, useRef, useState, type FormEvent } from 'react';
import { Alert, Form } from 'react-bootstrap';
import type { Account, TransactionRequest } from '../models/models';
import { validateAmount, validateTransfer } from '../utils/validator';
import { Button } from './Button';
import { Input } from './Input';

interface TransactionFormProps {
  accounts: Account[];
  // Resolve after a successful transaction; reject with an error on failure.
  onSubmit: (request: TransactionRequest) => Promise<void>;
}

interface FormErrors {
  account?: string;
  amount?: string;
  destination?: string;
  submit?: string;
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function TransactionForm({ accounts, onSubmit }: TransactionFormProps) {
  const id = useId();
  const submitting = useRef(false);
  const [type, setType] = useState<TransactionRequest['TransactionType']>('Deposit');
  const [accountId, setAccountId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const account = accounts.find((item) => String(item.AccountNumber) === accountId);
    const nextErrors: FormErrors = {
      account: account ? undefined : 'Select an available account.',
      amount: validateAmount(amount, type === 'Deposit' ? undefined : account?.Balance),
    };

    if (type === 'Transfer') {
      nextErrors.destination = validateTransfer(accountId, destinationId);
      if (!nextErrors.destination && !accounts.some(
        (item) => String(item.AccountNumber) === destinationId,
      )) {
        nextErrors.destination = 'Select an available destination account.';
      }
    }

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const request: TransactionRequest = {
      TransactionType: type,
      Amount: Number(amount.trim()),
      OriginID: type === 'Deposit' ? null : Number(accountId),
      DestinationID: type === 'Deposit'
        ? Number(accountId)
        : type === 'Transfer' ? Number(destinationId) : null,
    };

    submitting.current = true;
    setLoading(true);
    try {
      await onSubmit(request);
      setAmount('');
      setDestinationId('');
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Transaction failed. Please try again.',
      });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate aria-busy={loading}>
      {accounts.length === 0 && (
        <Alert variant="info">No accounts are available for transactions.</Alert>
      )}

      <fieldset disabled={loading || accounts.length === 0}>
        <legend className="h4">Make a transaction</legend>

        <Form.Group className="mb-3" controlId={`${id}-type`}>
          <Form.Label>Transaction type</Form.Label>
          <Form.Select value={type} onChange={(event) => {
            setType(event.target.value as TransactionRequest['TransactionType']);
            setDestinationId('');
            setErrors({});
          }}>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
            <option value="Transfer">Transfer</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId={`${id}-account`}>
          <Form.Label>{type === 'Deposit' ? 'Deposit into' : 'From account'}</Form.Label>
          <Form.Select
            value={accountId}
            isInvalid={!!errors.account}
            aria-describedby={errors.account ? `${id}-account-error` : undefined}
            onChange={(event) => {
              setAccountId(event.target.value);
              setDestinationId('');
              setErrors({});
            }}
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.AccountNumber} value={account.AccountNumber}>
                {account.AccountType} — {account.AccountNumber} — {currency.format(account.Balance)}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid" id={`${id}-account-error`}>
            {errors.account}
          </Form.Control.Feedback>
        </Form.Group>

        <Input
          label="Amount ($)"
          name={`${id}-amount`}
          value={amount}
          placeholder="0.00"
          onChange={(event) => {
            setAmount(event.target.value);
            setErrors((previous) => ({ ...previous, amount: undefined, submit: undefined }));
          }}
          error={errors.amount}
        />

        {type === 'Transfer' && (
          <Form.Group className="mb-3" controlId={`${id}-destination`}>
            <Form.Label>To account</Form.Label>
            <Form.Select
              value={destinationId}
              isInvalid={!!errors.destination}
              aria-describedby={errors.destination ? `${id}-destination-error` : undefined}
              onChange={(event) => {
                setDestinationId(event.target.value);
                setErrors((previous) => ({ ...previous, destination: undefined, submit: undefined }));
              }}
            >
              <option value="">Select a destination account</option>
              {accounts.filter((account) => String(account.AccountNumber) !== accountId)
                .map((account) => (
                  <option key={account.AccountNumber} value={account.AccountNumber}>
                    {account.AccountType} — {account.AccountNumber}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" id={`${id}-destination-error`}>
              {errors.destination}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        {errors.submit && <Alert variant="danger" role="alert">{errors.submit}</Alert>}

        <Button type="submit" loading={loading} className="w-100">
          {loading ? 'Processing…' : `Submit ${type}`}
        </Button>
      </fieldset>
    </Form>
  );
}
