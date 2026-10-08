import { Card } from 'react-bootstrap'
import { formatCurrency } from '../utils/formatCurrency'

// Defines the information this component expects
interface StatCardProps {
  label: string // Receives text such as "Checking"
  balance: number // Receives the account balance
}

export function StatCard({ label, balance }: StatCardProps) {
  const formattedBalance = formatCurrency(balance)

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="fs-6 text-muted">
          {label}
        </Card.Title>

        <Card.Text className="fs-3 fw-bold mb-0">
          {formattedBalance}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}