import { NavLink, Link } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav } from "react-bootstrap";

import hospitalLogo from "../assets/images/Logoimage.jpg";

function Navbar() {
  return (
    <BootstrapNavbar
      expand="lg"
      className="hospital-navbar"
    >
      <Container>

        <Link
          to="/"
          className="hospital-brand"
        >
          <div className="brand-logo">
            <img
              src={hospitalLogo}
              alt="Sri Kumaran Hospital Logo"
            />
          </div>

          <div className="brand-details">
            <span className="brand-name">
              Sri Kumaran Hospital
            </span>

            <span className="brand-location">
              Manapparai
            </span>
          </div>
        </Link>


        <BootstrapNavbar.Toggle
          aria-controls="main-navbar"
        />


        <BootstrapNavbar.Collapse id="main-navbar">

          <Nav className="ms-auto align-items-lg-center">

            <Nav.Link
              as={NavLink}
              to="/"
              end
            >
              Home
            </Nav.Link>


            <Nav.Link
              as={NavLink}
              to="/about"
            >
              About
            </Nav.Link>


            {/* Floating dropdown */}

            <div className="explore-menu">

              <button
                type="button"
                className="explore-button"
              >
                Explore

                <i className="bi bi-chevron-down"></i>
              </button>


              <div className="explore-dropdown">

                <div className="explore-title">
                  EXPLORE HOSPITAL
                </div>


                <Link to="/departments">

                  <div className="explore-icon">
                    <i className="bi bi-heart-pulse"></i>
                  </div>

                  <div>
                    <strong>Departments</strong>
                    <small>
                      Medical specialties
                    </small>
                  </div>

                  <i className="bi bi-arrow-up-right ms-auto"></i>

                </Link>


                <Link to="/doctors">

                  <div className="explore-icon">
                    <i className="bi bi-person-vcard"></i>
                  </div>

                  <div>
                    <strong>Doctors</strong>
                    <small>
                      Doctors and specialists
                    </small>
                  </div>

                  <i className="bi bi-arrow-up-right ms-auto"></i>

                </Link>


                <Link to="/services">

                  <div className="explore-icon">
                    <i className="bi bi-hospital"></i>
                  </div>

                  <div>
                    <strong>Services</strong>
                    <small>
                      Facilities and diagnostics
                    </small>
                  </div>

                  <i className="bi bi-arrow-up-right ms-auto"></i>

                </Link>

              </div>

            </div>


            <Nav.Link
              as={NavLink}
              to="/contact"
            >
              Contact
            </Nav.Link>


            <a
              href="tel:+917397391444"
              className="nav-call"
            >
              <i className="bi bi-telephone"></i>
              Call
            </a>

          </Nav>

        </BootstrapNavbar.Collapse>

      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;