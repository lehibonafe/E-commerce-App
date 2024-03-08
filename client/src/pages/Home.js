import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import landingImage from "../images/cheerful-woman.jpg";
import { Link } from "react-router-dom";
import { BagCheckFill } from "react-bootstrap-icons";

const Home = () => {
  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#fb8500",
          overflow: "hidden",
        }}
      >
        <Container>
          <Row className="pt-5">
            <Col className="pt-5" lg={6} style={{ alignItems: "center" }}>
              <h2 style={{ color: "#fff", fontSize: "5rem" }}>
                Welcome to Our Store!
              </h2>
              <p className="mt-5" style={{ color: "#fff", fontSize: "1.2rem" }}>
                Explore our wide range of products and find exactly what you
                need. From fashion to electronics, we've got it all!
              </p>
              <Link
                to={"/products/"}
                style={{ color: "#fb8500" }}
                className="btn btn-light"
              >
                Shop Now
                <BagCheckFill className="ms-2" size={20} />
              </Link>
            </Col>

            <Col lg={6} className="text-center">
              <img
                style={{
                  maxWidth: "700px",
                  height: "auto",
                }}
                src={landingImage}
                alt="Cheerful Woman"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
