import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="me-auto">
          Ad-board
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-end"
        >
          <Nav>
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {!user && (
              <Nav.Link as={NavLink} to="/register">
                Sign up
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={NavLink} to="/login">
                Sign in
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={NavLink} to="/logout">
                Sign out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
