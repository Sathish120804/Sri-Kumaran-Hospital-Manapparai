import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="hospital-footer">

      <Container>

        <Row className="footer-main g-5">

          <Col lg={5}>

            <h4>
              Sri Kumaran Hospital
            </h4>

            <p>
              Professional healthcare services in
              Manapparai with a focus on patient care,
              diagnosis and treatment.
            </p>


            <div className="footer-socials">

              <a
                href="#"
                aria-label="Facebook"
                onClick={(event) => event.preventDefault()}
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                onClick={(event) => event.preventDefault()}
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                onClick={(event) => event.preventDefault()}
              >
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </Col>


          <Col md={6} lg={3}>

            <h6>
              QUICK LINKS
            </h6>

            <div className="footer-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/departments">
                Departments
              </Link>

              <Link to="/doctors">
                Doctors
              </Link>

              <Link to="/services">
                Services
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </Col>


          <Col md={6} lg={4}>

            <h6>
              CONTACT
            </h6>

            <div className="footer-contact">

              <a href="tel:+917397391444">
                <i className="bi bi-phone"></i>
                73973 91444
              </a>

              <a href="tel:+914332261444">
                <i className="bi bi-telephone"></i>
                04332 261444
              </a>

              <a
                href="https://wa.me/917397391444"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
                WhatsApp
              </a>

              <span>
                <i className="bi bi-geo-alt"></i>
                50/9, Viralimalai - Manapparai Road,
                Manapparai - 621306
              </span>

            </div>

          </Col>

        </Row>


        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()}
            {" "}Sri Kumaran Hospital.
          </span>

          <span>
            Manapparai, Tamil Nadu
          </span>

        </div>

      </Container>

    </footer>
  );
}

export default Footer;