import { useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { StatCard } from '../components/StatCard'
import { TransactionList } from '../components/TransactionList'
import { AccountService } from '../service/AccountService'
import { TransactionService } from '../service/TransactionService'
import type { Account, Transaction } from '../models/models'

export function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [transactionsError, setTransactionsError] = useState<string | null>(null)

  // Load account balances.
  useEffect(() => {
    let active = true

    async function loadAccounts() {
      try {
        // 1 selects the mock service's successful response.
        const response = await AccountService.getAccountsByUsername(1)

        if (!active) return

        if (response.error || !response.data) {
          setError(response.error ?? 'Unable to load accounts.')
        } else {
          setAccounts(response.data.Accounts)
        }
      } catch {
        if (active) {
          setError('Unable to load accounts. Please try again.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadAccounts()

    return () => {
      active = false
    }
  }, [])

  // Load the five most recent transactions.
  useEffect(() => {
    let active = true

    async function loadTransactions() {
      try {
        // 1 selects the mock service's successful response.
        const response = await TransactionService.getTransactions(1)

        if (!active) return

        if (response.error || !response.data) {
          setTransactionsError(
            response.error ?? 'Unable to load transactions.'
          )
        } else {
          // The current mock dates use MM-DD-YYYY.
          const dateValue = (date: string) => {
            const [month, day, year] = date.split('-').map(Number)
            return new Date(year, month - 1, day).getTime()
          }

          const recentTransactions = [...response.data.Transactions]
            .sort((a, b) => dateValue(b.Date) - dateValue(a.Date))
            .slice(0, 5)

          setTransactions(recentTransactions)
        }
      } catch {
        if (active) {
          setTransactionsError(
            'Unable to load transactions. Please try again.'
          )
        }
      } finally {
        if (active) setTransactionsLoading(false)
      }
    }

    void loadTransactions()

    return () => {
      active = false
    }
  }, [])

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-dark">Your dashboard</h1>

      {loading ? (
        <p role="status">Loading your accounts...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <Row className="g-3">
          {accounts.map((account) => (
            <Col xs={12} md={6} key={account.AccountNumber}>
              <StatCard
                label={account.AccountType}
                balance={account.Balance}
              />
            </Col>
          ))}
        </Row>
      )}

      {transactionsLoading ? (
        <p className="mt-4" role="status">
          Loading recent transactions...
        </p>
      ) : transactionsError ? (
        <Alert variant="danger" className="mt-4">
          {transactionsError}
        </Alert>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </Container>
  )
}