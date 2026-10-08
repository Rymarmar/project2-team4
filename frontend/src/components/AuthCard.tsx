import { Card } from 'react-bootstrap'

// Defines the information this component expects
interface AuthCardProps {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  username: string
  password: string
  password2: string
}

export function AuthCard(props : AuthCardProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title as="h1" className="fs-6 text-muted">
          {"Name: "}{props.firstName} {" "} {props.lastName}
        </Card.Title>
        <Card.Title as="h2" className="fs-6 text-muted">
          Email: {" "}{props.email}
        </Card.Title>
        <Card.Title as="h2" className="fs-6 text-muted">
          Phone Number: {" "}{props.phoneNumber}
        </Card.Title>
        <Card.Title as="h2" className="fs-6 text-muted">
          Username: {" "}{props.username}
        </Card.Title>
        <Card.Title as="h2" className="fs-6 text-muted">
          Password: {" "}{props.password}
        </Card.Title>
        <Card.Title as="h2" className="fs-6 text-muted">
          Password2: {" "}{props.password2}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}