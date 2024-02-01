import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Cart2 } from "react-bootstrap-icons";
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
            <NavLink to={"/cart/all"}>
              <Cart2 size={26} />
            </NavLink>

            {user.id !== null ? (
              <div class="dropdown show">
                <a
                  class="btn dropdown-toggle"
                  href="#"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">
                    Account
                  </a>
                  <a class="dropdown-item" href="#">
                    Order
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            ) : (
              // <NavLink href="#pricing">
              //   {user.firstName[0]}
              //   {user.lastName[0]}
              // </NavLink>
              <NavLink href="#pricing">LOGIN</NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
