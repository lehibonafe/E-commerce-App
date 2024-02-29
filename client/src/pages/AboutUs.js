import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <h1 style={{ color: "#fb8500" }} className="mb-4">
            About Us
          </h1>
          <p className="mt-5">
            At ShopSwift, we're more than just a marketplace; we're a
            destination for seamless shopping experiences. With a passion for
            delivering top-notch products and exceptional service, we strive to
            redefine the way you shop online. Our curated selection of products
            caters to every taste and need, ensuring that you find exactly what
            you're looking for, whether it's the latest trends or timeless
            classics.
          </p>
          <p>
            Backed by a team of dedicated professionals, we're committed to
            providing you with a hassle-free shopping journey from start to
            finish. Join us on this journey and discover the convenience,
            reliability, and joy of shopping with ShopSwift.
          </p>
        </Col>
        <Col md={6}>
          {/* <img
            alt="About Us"
            className="img-fluid"
          /> */}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default AboutUs;
