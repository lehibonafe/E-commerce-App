import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: "400px" }} onSubmit={handleSubmit}>
        <h1 className="text-center mt-5">Register</h1>

        <Form.Group className="mt-4" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#fb8500" }}
          className="mt-3 w-100 border-0"
          type="submit"
        >
          REGISTER
        </Button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            style={{ color: "#fb8500" }}
            to={"/user/login/"}
            className="text-decoration-none"
          >
            Click here.
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
