import { Table } from 'react-bootstrap'
import type { Transaction } from '../models/models'

interface TransactionListProps {
  transactions: Transaction[] // The component expects a list of transactions
}

export function TransactionList({
  transactions,
}: TransactionListProps) {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <section className="mt-4 text-start">
      <h2 className="fs-4 text-dark">Recent transactions</h2>

      {transactions.length === 0 ? ( // Checks whether that list is empty
        <p>No transactions yet.</p>
      ) : ( // Allows the table to scroll horizontally if needed on a narrow screen
        <Table striped bordered hover responsive> 
          <caption className="visually-hidden">
            Recent account transactions
          </caption>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col" className="text-end">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => ( // .map creates one table row for each transaction
              <tr key={index}>
                <td>{transaction.Date}</td>
                <td>{transaction.TransactionType}</td>
                <td className="text-end"> 
                  {currency.format(transaction.Amount)} 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  )
}