import { Link } from 'react-router-dom';

// to be replaced with actual transactions content
export function TransactionsPage() {
  return (
    <div className="container py-5">
      <h1>Transactions (placeholder)</h1>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}