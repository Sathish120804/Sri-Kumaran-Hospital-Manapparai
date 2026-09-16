import { Container, Row, Col } from "react-bootstrap";

import hospitalMainImage from "../assets/images/Hospitalmainimage.jpg";

const doctorPatientImage =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85";

const medicalTeamImage =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85";

function About() {
  return (
    <div className="inner-page">

      {/* PAGE HERO */}

      <section className="page-hero">

        <Container>

          <span className="section-label">
            ABOUT SRI KUMARAN HOSPITAL
          </span>

          <h1>
            Healthcare with
            <br />
            <span>experience and care.</span>
          </h1>

          <p>
            Professional healthcare services for patients
            and families in Manapparai and surrounding areas.
          </p>

        </Container>

      </section>


      {/* MAIN STORY */}

      <section className="about-main-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={6}>

              <div className="about-large-image">

                <img
                  src={hospitalMainImage}
                  alt="Sri Kumaran Hospital Manapparai"
                />

              </div>

            </Col>


            <Col lg={6}>

              <span className="section-label">
                OUR HOSPITAL
              </span>

              <h2>
                Care built around
                <br />
                <span>people.</span>
              </h2>

              <p>
                Sri Kumaran Hospital in Manapparai provides
                professional healthcare services with a focus
                on patient care, accurate diagnosis and
                effective treatment.
              </p>

              <p>
                The hospital is equipped with experienced
                medical staff and essential medical facilities
                to serve patients with quality care.
              </p>

              <p>
                Available business information describes the
                hospital as having more than 15 years of
                experience in healthcare.
              </p>

            </Col>

          </Row>

        </Container>

      </section>


      {/* PEOPLE / CARE */}

      <section className="about-care-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={5}>

              <span className="section-label">
                PATIENT CARE
              </span>

              <h2>
                A compassionate
                <br />
                approach to
                <br />
                <span>healthcare.</span>
              </h2>

              <p>
                The hospital's focus on patient care,
                reliable medical services and effective
                treatment is at the centre of its approach.
              </p>

              <div className="about-list">

                <div>
                  <span>01</span>
                  <p>
                    Patient-focused healthcare
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <p>
                    Accurate diagnosis
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <p>
                    Effective treatment
                  </p>
                </div>

              </div>

            </Col>


            <Col lg={7}>

              <div className="care-image-large">

                <img
                  src={doctorPatientImage}
                  alt="Doctor consulting a patient"
                />

                <div className="care-image-caption">
                  Patient-focused care
                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* MEDICAL TEAM VISUAL */}

      <section className="medical-team-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={7}>

              <div className="medical-team-image">

                <img
                  src={medicalTeamImage}
                  alt="Healthcare professional"
                />

              </div>

            </Col>


            <Col lg={5}>

              <span className="section-label">
                MEDICAL TEAM
              </span>

              <h2>
                Experienced people
                <br />
                supporting
                <span> patient care.</span>
              </h2>

              <p>
                Sri Kumaran Hospital is supported by medical
                professionals and healthcare staff who work
                across its different departments and services.
              </p>

              {/* <p className="image-disclaimer">
                Illustrative healthcare imagery. Actual
                hospital doctors will be displayed from the
                approved hospital database.
              </p> */}

              <a
                href="tel:+917397391444"
                className="simple-link"
              >
                Contact the hospital
                <i className="bi bi-arrow-right"></i>
              </a>

            </Col>

          </Row>

        </Container>

      </section>


      {/* LOCATION */}

      <section className="location-section">

        <Container>

          <Row className="align-items-stretch g-4">

            <Col lg={5}>

              <div className="location-content">

                <span className="section-label">
                  FIND US
                </span>

                <h2>
                  Visit Sri Kumaran Hospital
                </h2>

                <p>
                  50/9, Viralimalai - Manapparai Road,
                  Anna Nagar, Manapparai,
                  Tiruchirappalli - 621306,
                  Tamil Nadu.
                </p>

                <div className="location-phone">

                  <a href="tel:+914332261444">
                    04332 261444
                  </a>

                  <a href="tel:+914332261445">
                    04332 261445
                  </a>

                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sri+Kumaran+Hospital,+50%2F9+Viralimalai-Manapparai+Road,+Manapparai,+Tamil+Nadu+621306"
                  target="_blank"
                  rel="noreferrer"
                  className="map-button"
                >
                  <i className="bi bi-geo-alt"></i>
                  Open in Google Maps
                </a>

              </div>

            </Col>


            <Col lg={7}>

              <div className="map-frame">

                <iframe
                  title="Sri Kumaran Hospital Location"
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

export default About;