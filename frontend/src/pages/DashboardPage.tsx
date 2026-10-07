import { Link } from 'react-router-dom';

// to be replaced with actual dashboard content
export function DashboardPage() {
  return (
    <div className="container py-5">
      <h1>Dashboard (placeholder)</h1>
      <Link to="/transactions">Go to Transactions</Link>
    </div>
  );
}