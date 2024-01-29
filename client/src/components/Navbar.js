import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import UserContext from "../UserContext";
import { useContext } from "react";

function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Fake Store API</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            {user.id !== null ? (
              <Nav.Link href="#pricing">
                {user.firstName[0]}
                {user.lastName[0]}
              </Nav.Link>
            ) : (
              <Nav.Link href="#pricing">LOGIN</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
