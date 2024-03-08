import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { Github } from "react-bootstrap-icons";

const Contact = () => {
  return (
    <Container>
      <h1 style={{ color: "#fb8500" }} className="mt-5">
        Contact
      </h1>
      <div>
        <span className="fw-bold">For Inquiries:</span> bonafe.lehi@gmail.com
      </div>
      <div>
        <span className="fw-bold">Contact No.: </span> +639171077417
      </div>
      <div className="mt-4">
        <a
          style={{
            backgroundColor: "#fb8500",
            borderRadius: "20px",
            padding: "7px 10px",
          }}
          href="https://github.com/lehibonafe/e-commerce-app"
          target="_blank"
          className="text-decoration-none text-light"
        >
          <Github className="me-2" />
          Github
        </a>
      </div>
      <Footer />
    </Container>
  );
};

export default Contact;
