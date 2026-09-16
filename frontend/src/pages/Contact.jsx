import { Container, Row, Col } from "react-bootstrap";

function Contact() {
  return (
    <div className="inner-page">

      <section className="page-hero page-hero-small">

        <Container>

          <span className="section-label">
            CONTACT
          </span>

          <h1>
            Get in touch
            <br />
            <span>with the hospital.</span>
          </h1>

          <p>
            Contact Sri Kumaran Hospital for appointments,
            enquiries and directions.
          </p>

        </Container>

      </section>


      <section className="contact-main-section">

        <Container>

          <Row className="g-4">

            <Col md={6} lg={4}>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  <i className="bi bi-telephone"></i>
                </div>

                <span>LANDLINE</span>

                <a href="tel:+914332261444">
                  04332 261444
                </a>

                <a href="tel:+914332261445">
                  04332 261445
                </a>

              </div>

            </Col>


            <Col md={6} lg={4}>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  <i className="bi bi-phone"></i>
                </div>

                <span>MOBILE</span>

                <a href="tel:+917397391444">
                  73973 91444
                </a>

              </div>

            </Col>


            <Col md={6} lg={4}>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  <i className="bi bi-whatsapp"></i>
                </div>

                <span>WHATSAPP</span>

                <a
                  href="https://wa.me/917397391444"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat with Hospital
                </a>

              </div>

            </Col>

          </Row>


          <Row className="contact-location-row g-5">

            <Col lg={5}>

              <div className="contact-location-content">

                <span className="section-label">
                  HOSPITAL ADDRESS
                </span>

                <h2>
                  Sri Kumaran Hospital
                </h2>

                <p>
                  50/9, Viralimalai - Manapparai Road,
                  Anna Nagar, Manapparai,
                  Tiruchirappalli - 621306,
                  Tamil Nadu.
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sri+Kumaran+Hospital,+50%2F9+Viralimalai-Manapparai+Road,+Manapparai,+Tamil+Nadu+621306"
                  target="_blank"
                  rel="noreferrer"
                  className="map-button"
                >
                  <i className="bi bi-map"></i>
                  Get Directions
                </a>

              </div>

            </Col>


            <Col lg={7}>

              <div className="contact-map">

                <iframe
                  title="Sri Kumaran Hospital Map"
                  src="https://www.google.com/maps?q=Sri%20Kumaran%20Hospital%2C%2050%2F9%20Viralimalai-Manapparai%20Road%2C%20Manapparai%2C%20Tamil%20Nadu%20621306&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </div>

            </Col>

          </Row>

        </Container>

      </section>

    </div>
  );
}

export default Contact;