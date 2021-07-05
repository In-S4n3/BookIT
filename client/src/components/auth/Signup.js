import React, { useState } from "react";
import AuthService from "./auth-service";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  let service = new AuthService();

  let handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  let handleLastName = (e) => {
    setLastName(e.target.value);
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    service
      .signup(firstName, lastName, email, password)
      .then((response) => {
        console.log("response from signup component call", response);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        props.history.push("/");
      })
      .catch((err) => console.log(setError(err?.response?.data?.message)));
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleFirstName}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleLastName}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={handleEmail}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePassword}
                required
              ></Form.Control>
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <a href="/login">Login</a>
      </div>
    </>
  );
}
