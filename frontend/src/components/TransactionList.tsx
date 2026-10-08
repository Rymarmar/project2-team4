import { Table } from 'react-bootstrap'
import type { Transaction } from '../models/models'
import { formatCurrency } from '../utils/formatCurrency'

interface TransactionListProps {
  transactions: Transaction[]
  title?: string
}

export function TransactionList({
  transactions,
  title = 'Recent transactions',
}: TransactionListProps) {

  return (
    <section className="mt-4 text-start">
      <h2 className="fs-4 text-dark">{title}</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <caption className="visually-hidden">{title}</caption>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col" className="text-end">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.ID}>
                <td>{transaction.Date}</td>
                <td>{transaction.TransactionType}</td>
                <td className="text-end">
                  {formatCurrency(transaction.Amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  )
}