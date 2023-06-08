import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import instance from "../helpers/fetchWrapper";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    instance.post("/auth/logout").then((res) => {
      if (res.status === 200) {
        dispatch(logout());
      }
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="text-white" to="/">
            Project Management
          </Link>
        </Navbar.Brand>
        {isAuthenticated && (
          <NavDropdown
            title={`Welcome, ${user.name}`}
            id="collasible-nav-dropdown"
            className="text-white"
          >
            <NavDropdown.Item>
              <Link className="text-danger" onClick={logoutHandler}>
                <i className="fas fa-sign-out-alt mx-1"></i>
                Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
