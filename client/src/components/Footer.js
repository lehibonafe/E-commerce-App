import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Youtube, Instagram } from "react-bootstrap-icons";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#ffffff" }} className="footer py-5">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <div className="footer-col">
              <h4 style={{ fontWeight: "bold" }}>Company</h4>
              <ul className="list-unstyled">
                <li className="pt-3">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Our Services
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="footer-col">
              <h4 style={{ fontWeight: "bold" }}>Get Help</h4>
              <ul className="list-unstyled">
                <li className="pt-3">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Shipping
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Returns
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Order Status
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Payment Options
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="footer-col">
              <h4 style={{ fontWeight: "bold" }}>Online Shop</h4>
              <ul className="list-unstyled">
                <li className="pt-3">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Watch
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Bag
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Shoes
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    style={{ color: "#fb8500" }}
                    className="text-decoration-none"
                    href="#"
                  >
                    Dress
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="footer-col">
              <h4 style={{ fontWeight: "bold" }}>Follow Us</h4>
              <div className="social-links pt-3">
                <a
                  style={{ color: "#fb8500" }}
                  className="pe-3"
                  href="#"
                  title="Facebook"
                >
                  <Facebook size={25} />
                </a>
                <a
                  style={{ color: "#fb8500" }}
                  className="pe-3"
                  href="#"
                  title="Twitter"
                >
                  <Twitter size={25} />
                </a>
                <a
                  style={{ color: "#fb8500" }}
                  className="pe-3"
                  href="#"
                  title="YouTube"
                >
                  <Youtube size={25} />
                </a>
                <a
                  style={{ color: "#fb8500" }}
                  className="pe-3"
                  href="#"
                  title="Instagram"
                >
                  <Instagram size={25} />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
