import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData; // Destructuring formData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (
  //     firstName !== "" &&
  //     lastName !== "" &&
  //     email !== "" &&
  //     password !== "" &&
  //     confirmPassword !== "" &&
  //     password === confirmPassword
  //   ) {
  //     // enables the button
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(event) {
    event.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Registered Successfully") {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          Swal.fire({
            icon: "success",
            title: "Registered successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/user/login/");
        } else {
          // If the registration is not successful, handle it here
          Swal.fire({
            icon: "error",
            title: data.error, // Display the message received from the server
            text: data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: "An error occurred while registering. Please try again later.",
        });
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: "400px" }} onSubmit={registerUser}>
        <h1 style={{ color: "#fb8500" }} className="text-center mt-5">
          Register
        </h1>

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
        <Form.Group className="mt-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="confirmPassword">
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
          SUBMIT
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
