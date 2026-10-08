import { useState } from 'react'
import { Alert, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom' // Opens another route without reloading the whole app
import { Button } from './Button'
import { useAuth } from '../hooks/useAuth'

export function AppNavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogout() {
    setLoggingOut(true)
    setError(null)

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setError('Unable to log out. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <>
      <Navbar bg="light" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/dashboard">
            50/50 Bank
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="bank-navigation" />

          <Navbar.Collapse id="bank-navigation">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                eventKey="dashboard"
              >
                Dashboard
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/transactions"
                eventKey="transactions"
              >
                Transactions
              </Nav.Link>
            </Nav>

            {user && (
              <Navbar.Text className="me-3">
                Hello, {user.FirstName} 
              </Navbar.Text>
            )} 

            <Button
              variant="outline-secondary"
              loading={loggingOut}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {error && (
        <Container className="mt-3">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
    </>
  )
}