import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  function authenticate(e) {
    e.preventDefault();

    fetch(`${API_URL}/user/login`, {
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
          localStorage.setItem("access", data.access_token);
          retrieveUserDetails(data.access_token);
          setEmail("");
          setPassword("");
        } else {
          setAccountError(data.message);
        }
      });
  }

  const retrieveUserDetails = (token) => {
    fetch(`${API_URL}/user/details`, {
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
      });
  };

  return user.id !== null ? (
    <Navigate to={"/products"} />
  ) : (
    <Container className="mt-5">
      <Form
        style={{ maxWidth: "400px", margin: "auto" }}
        onSubmit={(e) => authenticate(e)}
      >
        <h2 className="text-center">ACCOUNT LOGIN</h2>
        <hr className="my-4" style={{ width: "20%", margin: "auto" }} />
        <Form.Group className="mt-5" controlId="formBasicEmail">
          <Form.Label className="fw-bold" style={{ color: "#fb8500" }}>
            Email address :
          </Form.Label>
          <Form.Control
            autoFocus
            style={{ fontSize: ".8rem" }}
            className="shadow-none"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold" style={{ color: "#fb8500" }}>
            Password :
          </Form.Label>
          <Form.Control
            style={{ fontSize: ".8rem" }}
            className="shadow-none p-2"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p className="text-center my-2" style={{ color: "#ff3333" }}>
          {accountError}
        </p>
        <Button
          style={{ backgroundColor: "#fb8500" }}
          className="mt-4 border-0 w-100"
          type="submit"
        >
          Login
        </Button>
      </Form>

      <p className="text-center mt-5">
        Don't have an account?{" "}
        <Link
          style={{ color: "#fb8500" }}
          className="text-decoration-none"
          to={"/user/register"}
        >
          Click here.
        </Link>
      </p>
    </Container>
  );
};

export default LoginForm;
