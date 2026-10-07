import { useEffect, useState } from 'react' // Remembers accounts, loading status, and errors
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { StatCard } from '../components/StatCard'
import { AccountService } from '../service/AccountService'
import type { Account } from '../models/models'

export function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { // Starts loading when the page appears
    let active = true

    async function loadAccounts() {
      try {
        // 1 selects the mock service's successful response
        const response =
          await AccountService.getAccountsByUsername(1)

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
          {accounts.map((account) => ( // Creates one card for each account, Stacks cards on phones and places them side by side on wider screens
            <Col xs={12} md={6} key={account.AccountNumber}> 
              <StatCard
                label={account.AccountType}
                balance={account.Balance}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}