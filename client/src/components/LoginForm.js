import { React, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  function authenticate(e) {
    e.preventDefault();

    fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          alert("You are now log in");
          localStorage.setItem("access", data.access_token);
          retrieveUserDetails(data.access_token);
        }
        setEmail("");
        setPassword("");
      });
  }
  const retrieveUserDetails = (token) => {
    fetch(`${API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.result.id,
          firstName: data.result.firstName,
          lastName: data.result.lastName,
        });

        console.log(user);
      });
  };

  return user.id !== null ? (
    <Navigate to={"/products"} />
  ) : (
    <Form onSubmit={(e) => authenticate(e)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
