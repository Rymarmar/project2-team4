import { AuthCard } from '../components/AuthCard.tsx';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Input } from '../components/Input.tsx'; // Adjust the import path based on your file structure
import { Redirect } from '../components/Redirect.tsx'

// to be replaced with actual login content
export function LoginPage() {
  return (
    <div className="container py-5">
      <h1>Welcome back to 50/50 Bank</h1>

      {/* Basic login form using the Input framework */}
      <LoginForm />

      {/* Testing displaying the authentication card
      <AuthCard 
        firstName="Bob"
        lastName="Smith"
        email="bobsmith@gmail.com"
        phoneNumber="123-456-7890"
        username="bobsmith"
        password="ilovemyself"
        password2="ilovemyself"
      />
      */}

      <hr />
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsernameInvalid(false);
    setPasswordInvalid(false);

    const isUsernameWrong = username !== "johnsmith";
    const isPasswordWrong = password !== "secretpassword123";

    if (isUsernameWrong || isPasswordWrong) {
      if (isUsernameWrong) {
        setUsernameInvalid(true);
        return;
      } else if (isPasswordWrong) {
        setPasswordInvalid(true);
      }
      return;
    }

    console.log("Submitted: ", username, password);
  }

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <Input 
        label="Username" 
        name="username" 
        type="text" 
        placeholder="jdoe123"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameInvalid(false);
        }}
        error={usernameInvalid ? "Username invalid" : ""}
      />

      {/* Email Input with Error Handling */}
      <Input 
        label="Password" 
        name="password" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordInvalid(false);
        }}
        error={passwordInvalid ? "Incorrect password" : ''}
      />

      <Redirect
        style={{display: "inline-block", padding: "0px 0px 10px"}}
        link="/register"
        message="Don't have an account? Click here to register"
      />

      <Button type="submit" variant="primary">Submit</Button>
    </Form>
  );
}