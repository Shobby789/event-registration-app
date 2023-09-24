import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Menubar.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";

export default function Menubar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem("userDetails"));
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/");
  };

  const handleCreateEvent = () => {
    if (isLoggedIn) {
      navigate("/create-event");
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className={colorChange ? "text-bg-light" : "text-bg-light"}
    >
      <Container>
        <Navbar.Brand
          to="/"
          className={
            colorChange ? "text-dark fw-bold fs-1" : "text-dark fw-bold fs-1"
          }
        >
          me<span className="fw-bold text-danger">U</span>p
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-0"
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="">
          <Nav className="ms-auto">
            <Nav>
              <Link
                to={"/"}
                className={colorChange ? "dark-links" : "light-links"}
              >
                Home
              </Link>
            </Nav>
            <Nav>
              <Link
                to={"/all-events"}
                className={colorChange ? "dark-links" : "light-links"}
              >
                Events
              </Link>
            </Nav>
          </Nav>
          {/* <Nav> */}
          <Nav>
            {isLoggedIn !== null ? (
              <Link
                to={`/my-events/${isLoggedIn?.user?._id}`}
                className={colorChange ? "dark-links" : "light-links"}
              >
                My Events
              </Link>
            ) : (
              <Link
                to="/login"
                className={colorChange ? "dark-links" : "light-links"}
              >
                Login
              </Link>
            )}
          </Nav>
          <Nav className="">
            {isLoggedIn !== null ? (
              <Button
                variant="danger"
                onClick={handleLogout}
                className="me-1 fw-semibold"
              >
                Logout
              </Button>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {isLoggedIn !== null ? (
              <></>
            ) : (
              <Link
                to={"/register"}
                className={colorChange ? "dark-links" : "light-links"}
              >
                Register
              </Link>
            )}
          </Nav>
          <Button
            variant="danger"
            size=""
            className="fw-semibold"
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
