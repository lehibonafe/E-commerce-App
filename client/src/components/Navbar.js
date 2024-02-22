import { React, useState, useContext, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Cart, Cart2 } from "react-bootstrap-icons";
import UserContext from "../UserContext";
import LoginForm from "./LoginForm";

function AppNavbar() {
  const { user, unsetUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState({ cartItems: [] });

  // Your useEffect hook remains the same
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/cart/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((products) => {
        setCart(products);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  return (
    <Navbar style={{ backgroundColor: "#fb8500" }} data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          <NavLink to={"/products/"}>Fake Store API</NavLink>
        </Navbar.Brand>
        <Nav className="ms-auto w-100 position-relative align-items-baseline">
          <NavLink
            style={{ fontSize: "12px", color: "#ffffff" }}
            className="text-decoration-none px-3"
          >
            HOME
          </NavLink>
          <NavLink
            style={{ fontSize: "12px", color: "#ffffff" }}
            className="text-decoration-none px-3"
          >
            PRODUCTS
          </NavLink>
          <NavLink
            style={{ fontSize: "12px", color: "#ffffff" }}
            className="text-decoration-none px-3"
          >
            ABOUT US
          </NavLink>
          <NavLink
            style={{ fontSize: "12px", color: "#ffffff" }}
            className="text-decoration-none px-3"
          >
            CONTACT
          </NavLink>
          {user.id !== null ? (
            <div className="ms-auto">
              <NavLink
                className="me-3 position-relative"
                style={{ color: "#ffffff" }}
                to={"/cart/all"}
              >
                <Cart2 size={35} />
                {cart.cartItems && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      backgroundColor: "#ffffff",
                      borderRadius: "100%",
                      width: "16px",
                      height: "16px",
                      textAlign: "center",
                      fontSize: "10px",
                      top: "-5px",
                      right: "-2px",
                      color: "#fb8500",
                    }}
                  >
                    {cart.cartItems.length}
                  </div>
                )}
              </NavLink>
            </div>
          ) : (
            <NavLink
              className="pe-2 ms-auto"
              style={{ color: "#ffffff" }}
              to={"/user/login"}
            >
              <Cart2 size={35} />
            </NavLink>
          )}
          {user.id !== null ? (
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#ffffff",
                  border: "0",
                  borderRadius: "100%",
                  height: "35px",
                  width: "35px",
                  color: "#000000",
                  fontSize: "12px",
                  padding: "9px",
                  textAlign: "center",
                }}
                id="dropdown-basic"
              >
                {user.firstName[0] + user.lastName[0]}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Account</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Orders</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <NavLink
                    className="text-decoration-none"
                    to={"/user/logout/"}
                  >
                    Logout
                  </NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div>
              <NavLink
                style={{ fontSize: "12px", color: "#ffffff" }}
                className="px-2 text-decoration-none"
                variant="primary"
                to={"/user/login"}
              >
                LOGIN
              </NavLink>
              <NavLink
                style={{ fontSize: "12px", color: "#ffffff" }}
                to={"/user/register"}
                className="px-2 text-decoration-none"
              >
                REGISTER
              </NavLink>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
