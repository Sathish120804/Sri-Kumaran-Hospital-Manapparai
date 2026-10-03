import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const hospitalMapUrl =
    "https://maps.app.goo.gl/KkHYYeNkFbbXsa9S8";

  return (
    <footer className="hospital-footer">
      <div className="container">

        <div className="footer-main">
          <div className="row gy-5">

            {/* Hospital */}
            <div className="col-lg-4 col-md-6">

              <h4>Sri Kumaran Hospital</h4>

              <p>
                Manapparai, Tiruchirappalli,
                <br />
                Tamil Nadu - 621306
              </p>

              <p>
                Providing compassionate and quality healthcare
                services with modern medical facilities and
                experienced doctors.
              </p>

              <div className="footer-socials">

                <a
                  href="https://www.facebook.com/p/Sri-Kumaran-Hospital-Manapparai-61574408520560/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Kumaran Hospital on Facebook"
                >
                  <i
                    className="bi bi-facebook"
                    aria-hidden="true"
                  ></i>
                </a>

                <a
                  href="https://www.instagram.com/sri_kumaranhospital_manavai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Kumaran Hospital on Instagram"
                >
                  <i
                    className="bi bi-instagram"
                    aria-hidden="true"
                  ></i>
                </a>

                <a
                  href="https://www.linkedin.com/in/sri-kumaran-hospital-manavai-b5b818322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Kumaran Hospital on LinkedIn"
                >
                  <i
                    className="bi bi-linkedin"
                    aria-hidden="true"
                  ></i>
                </a>

              </div>

            </div>


            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">

              <h6>QUICK LINKS</h6>

              <div className="footer-links">

                <Link to="/">Home</Link>

                <Link to="/about">
                  About Us
                </Link>

                <Link to="/departments">
                  Departments
                </Link>

                <Link to="/doctors">
                  Our Doctors
                </Link>

                <Link to="/services">
                  Services
                </Link>

                <Link to="/contact">
                  Contact
                </Link>

              </div>

            </div>


            {/* Departments */}
            <div className="col-lg-3 col-md-6">

              <h6>DEPARTMENTS</h6>

              <div className="footer-links">

                <Link to="/departments">
                  Orthopaedics
                </Link>

                <Link to="/departments">
                  Spine Surgery
                </Link>

                <Link to="/departments">
                  General Medicine
                </Link>

                <Link to="/departments">
                  Cardiology
                </Link>

                <Link to="/departments">
                  Paediatrics
                </Link>

                <Link to="/departments">
                  Department of Neurology
                </Link>

              </div>

            </div>


            {/* Contact */}
            <div className="col-lg-3 col-md-6">

              <h6>CONTACT US</h6>

              <div className="footer-contact">

                <a
                  href="tel:04332261444"
                  aria-label="Call Sri Kumaran Hospital"
                >
                  <i
                    className="bi bi-telephone"
                    aria-hidden="true"
                  ></i>

                  <span>
                    04332 261444
                  </span>
                </a>


                <a
                  href="https://wa.me/914332261444"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Sri Kumaran Hospital on WhatsApp"
                >
                  <i
                    className="bi bi-whatsapp"
                    aria-hidden="true"
                  ></i>

                  <span>
                    WhatsApp
                  </span>
                </a>


                {/* Google Maps */}
                <a
                  href={hospitalMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to Sri Kumaran Hospital"
                >
                  <i
                    className="bi bi-geo-alt"
                    aria-hidden="true"
                  ></i>

                  <span>
                    Get Directions
                  </span>
                </a>


                <span>
                  <i
                    className="bi bi-building"
                    aria-hidden="true"
                  ></i>

                  <span>
                    50/9, Viralimalai Road,
                    <br />
                    Anna Nagar, Manapparai,
                    <br />
                    Tiruchirappalli,
                    <br />
                    Tamil Nadu - 621306
                  </span>
                </span>

              </div>

            </div>

          </div>
        </div>


        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © {currentYear} Sri Kumaran Hospital.
            All Rights Reserved.
          </p>

          <p>
            Quality Healthcare
            <span> • </span>
            Compassionate Care
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;