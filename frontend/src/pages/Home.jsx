import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import hospitalMainImage from "../assets/images/Hospitalmainimage.jpg";

const patientCareImage =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85";

const consultationImage =
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=85";


function Home() {

  const departments = [
    "Orthopaedics",
    "Spine Surgery",
    "General Medicine",
    "Cardiology",
    "Paediatrics",
    "Neurology",
  ];


  const services = [
    {
      icon: "bi bi-camera",
      title: "Spiral CT Scan",
    },
    {
      icon: "bi bi-soundwave",
      title: "Ultrasound & Colour Doppler",
    },
    {
      icon: "bi bi-heart-pulse",
      title: "ECHO & ECG",
    },
    {
      icon: "bi bi-image",
      title: "300 mA X-Ray",
    },
    {
      icon: "bi bi-droplet-half",
      title: "24-Hour Laboratory",
    },
    {
      icon: "bi bi-capsule",
      title: "24-Hour Pharmacy",
    },
    {
      icon: "bi bi-droplet",
      title: "24-Hour Blood Bank",
    },
    {
      icon: "bi bi-robot",
      title: "Robotic Surgery",
    },
  ];


  return (
    <div className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={5}>

              <div className="hero-content">

                <span className="hero-label">
                  SRI KUMARAN HOSPITAL · MANAPPARAI
                </span>


                <h1>
                  Care for today.
                  <br />
                  <span>Healthier tomorrow.</span>
                </h1>


                <p>
                  Professional healthcare with a focus on
                  patient care, accurate diagnosis and
                  effective treatment.
                </p>


                <div className="hero-actions">

                  <Link
                    to="/departments"
                    className="hero-primary"
                  >
                    Explore Departments

                    <i className="bi bi-arrow-right"></i>
                  </Link>


                  <Link
                    to="/contact"
                    className="hero-secondary"
                  >
                    Contact Hospital
                  </Link>

                </div>


                <div className="hero-location">

                  <i className="bi bi-geo-alt"></i>

                  <span>
                    Viralimalai - Manapparai Road,
                    Manapparai - 621306
                  </span>

                </div>

              </div>

            </Col>


            <Col lg={7}>

              <div className="main-image-card">

                <img
                  src={hospitalMainImage}
                  alt="Sri Kumaran Hospital, Manapparai"
                />


                <div className="image-caption">

                  <span>
                    OUR HOSPITAL
                  </span>

                  <strong>
                    Sri Kumaran Hospital
                  </strong>

                  <small>
                    Manapparai
                  </small>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="quick-links-section">

        <Container>

          <Row className="g-3">

            <Col md={4}>

              <Link
                to="/departments"
                className="quick-link-card"
              >

                <div className="quick-icon">
                  <i className="bi bi-heart-pulse"></i>
                </div>

                <div>
                  <small>EXPLORE</small>
                  <strong>Departments</strong>
                </div>

                <i className="bi bi-arrow-up-right ms-auto"></i>

              </Link>

            </Col>


            <Col md={4}>

              <Link
                to="/doctors"
                className="quick-link-card"
              >

                <div className="quick-icon">
                  <i className="bi bi-person-vcard"></i>
                </div>

                <div>
                  <small>MEET</small>
                  <strong>Our Doctors</strong>
                </div>

                <i className="bi bi-arrow-up-right ms-auto"></i>

              </Link>

            </Col>


            <Col md={4}>

              <Link
                to="/services"
                className="quick-link-card"
              >

                <div className="quick-icon">
                  <i className="bi bi-hospital"></i>
                </div>

                <div>
                  <small>DISCOVER</small>
                  <strong>Our Services</strong>
                </div>

                <i className="bi bi-arrow-up-right ms-auto"></i>

              </Link>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          ABOUT / PATIENT CARE
      ===================================================== */}

      <section className="about-home-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={5}>

              <div className="about-image-wrap">

                <img
                  src={patientCareImage}
                  alt="Doctor consulting with a patient"
                  className="about-care-image"
                />

                <div className="about-image-note">

                  <span>
                    PATIENT CARE
                  </span>

                  <strong>
                    Care with experience and compassion.
                  </strong>

                </div>

              </div>

            </Col>


            <Col lg={7}>

              <div className="about-home-content">

                <span className="section-label">
                  ABOUT SRI KUMARAN HOSPITAL
                </span>


                <h2>
                  Healthcare with
                  <br />
                  <span>care at its heart.</span>
                </h2>


                <p className="about-lead">
                  Sri Kumaran Hospital in Manapparai provides
                  professional healthcare services with a focus
                  on patient care, accurate diagnosis and
                  effective treatment.
                </p>


                <p>
                  The hospital is supported by experienced
                  medical staff and essential medical facilities
                  to serve patients with quality care.
                </p>


                <p>
                  With more than 15 years of experience in the
                  healthcare industry as described in available
                  business information, the hospital serves
                  individuals and families in Manapparai and
                  nearby areas.
                </p>


                <Link
                  to="/about"
                  className="simple-link"
                >
                  Read more about the hospital
                  <i className="bi bi-arrow-right"></i>
                </Link>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          CARE EXPERIENCE / CONSULTATION IMAGE
      ===================================================== */}

      <section className="care-story-section">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={7}>

              <div className="care-story-image">

                <img
                  src={consultationImage}
                  alt="Doctor and patient consultation"
                />

              </div>

            </Col>


            <Col lg={5}>

              <span className="section-label">
                A PATIENT-CENTRED APPROACH
              </span>


              <h2>
                From diagnosis
                <br />
                to treatment,
                <br />
                <span>care matters.</span>
              </h2>


              <p className="care-story-text">
                Our website brings together the hospital's
                medical departments, doctors, diagnostic
                facilities and healthcare services so patients
                can find the information they need more easily.
              </p>


              <div className="care-points">

                <div>
                  <i className="bi bi-check2"></i>
                  <span>Experienced medical team</span>
                </div>

                <div>
                  <i className="bi bi-check2"></i>
                  <span>Diagnostic and treatment facilities</span>
                </div>

                <div>
                  <i className="bi bi-check2"></i>
                  <span>Direct appointment enquiries</span>
                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section className="departments-home-section">

        <Container>

          <div className="section-heading">

            <div>

              <span className="section-label">
                MEDICAL DEPARTMENTS
              </span>

              <h2>
                Find the right
                <br />
                <span>department.</span>
              </h2>

            </div>


            <Link
              to="/departments"
              className="simple-link"
            >
              View all
              <i className="bi bi-arrow-up-right"></i>
            </Link>

          </div>


          <Row className="g-4">

            {departments.map((department, index) => (

              <Col
                md={6}
                lg={4}
                key={department}
              >

                <Link
                  to="/departments"
                  className="department-card"
                >

                  <span className="department-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>


                  <span className="department-name">
                    {department}
                  </span>


                  <i className="bi bi-arrow-up-right"></i>

                </Link>

              </Col>

            ))}

          </Row>

        </Container>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="services-home-section">

        <Container>

          <div className="services-heading">

            <div>

              <span className="section-label">
                FACILITIES & SERVICES
              </span>

              <h2>
                Modern facilities for
                <br />
                <span>better care.</span>
              </h2>

            </div>


            <p>
              Explore the diagnostic, laboratory, pharmacy
              and surgical facilities available at the hospital.
            </p>

          </div>


          <Row className="g-4">

            {services.map((service) => (

              <Col
                xs={6}
                md={4}
                lg={3}
                key={service.title}
              >

                <Link
                  to="/services"
                  className="service-card"
                >

                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>


                  <h5>
                    {service.title}
                  </h5>


                  <span className="service-card-arrow">

                    <i className="bi bi-arrow-up-right"></i>

                  </span>

                </Link>

              </Col>

            ))}

          </Row>

        </Container>

      </section>


      {/* =====================================================
          FINAL CONTACT
      ===================================================== */}

      <section className="contact-home-section">

        <Container>

          <Row className="align-items-center">

            <Col lg={8}>

              <span className="contact-label">
                APPOINTMENTS & ENQUIRIES
              </span>

              <h2>
                Need to speak with
                <br />
                the hospital?
              </h2>

              <p>
                Contact Sri Kumaran Hospital directly for
                appointments and enquiries.
              </p>

            </Col>


            <Col lg={4}>

              <div className="contact-home-actions">

                <a
                  href="tel:+917397391444"
                  className="contact-main-btn"
                >
                  <i className="bi bi-telephone"></i>
                  Call Hospital
                </a>


                <a
                  href="https://wa.me/917397391444"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-whatsapp-btn"
                >
                  <i className="bi bi-whatsapp"></i>
                  WhatsApp
                </a>

              </div>

            </Col>

          </Row>

        </Container>

      </section>

    </div>
  );
}

export default Home;