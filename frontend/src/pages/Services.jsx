import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";

import api from "../services/api";

import "./Services.css";


/* =========================================================
   SERVICE IMAGES
========================================================= */

const serviceImages = {
  "Spiral CT Scan":
    "https://cdn.ftvnews.com.tw/manasystem/FileData/News/dd402fc0-20f7-4f4e-9faf-d3453189732d.jpg",

  "Ultrasound and Colour Doppler Scan":
    "https://www.nobleimaginganddiagnostics.com/wp-content/uploads/2025/05/Colour-Doppler.jpg",

  "ECHO Scan":
    "https://www.prolifediagnostics.in/wp-content/uploads/2024/11/hygea-med-aboratories.jpeg",

  ECG:
    "https://kiranhospital.com/storage/app/public/uploads/specialities/internal_medicine_infectious_diseases/8026762162.png",

  "300 mA X-Ray Unit":
    "https://cpimg.tistatic.com/06555283/b/4/300ma-X-Ray-Machine.jpg",

  "24-Hour Advanced Laboratory and Blood Tests":
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=85",

  "24-Hour Pharmacy":
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=85",

  "24-Hour Blood Bank":
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=85",

  "Chief Minister's Comprehensive Health Insurance Scheme":
    "https://d28c6jni2fmamz.cloudfront.net/055_CT_FEB_002_Images_for_Government_Scheme_Pages_5_f318ccd081_751290530b.webp",

  "Fracture Surgery":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Growing_to_meet_your_needs%2C_Langley_Orthopedics_is_bad_to_the_bone_130205-F-JC454-199.jpg/250px-Growing_to_meet_your_needs%2C_Langley_Orthopedics_is_bad_to_the_bone_130205-F-JC454-199.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",

  "Jaw Fracture Surgery":
    "https://imslegal.co.uk/asset/66abac4feb4ed/1_Mandibular-Fracture.jpg",

  "Spinal Surgery":
    "https://www.nepalhealthnews.com/uploads/posts/dr-basant-2-1749816856.jpg",

  "Microendoscopic Cervical Discectomy (MCD)":
    "https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319827/anterior-cervical-discectomy-and-fusion-surgery-br-image-credit-debivort-2007-br.png",

  "Advanced Joint Replacement Surgery":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6qLg0J4X1-EFOTvTfqF0WpIS-jV9Vtg-e9g6QjG2CA2HvewY8rSdzO4&s=10",

  "Microendoscopic Knee Surgery":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h9UYxMyqRWEvHXujyeXAZ0asQ4uDHy9RTh8ZObqqo77A1UOdH-BkCwoA&s=10",

  "Robotic Surgery":
    "https://api.hub.jhu.edu/factory/sites/default/files/styles/soft_crop_1300/public/2025-07/robot-surgery-procedure_2.jpg",
};


/* =========================================================
   SERVICES PAGE
========================================================= */

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =======================================================
     FETCH SERVICES
  ======================================================= */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/Services");

        const data = Array.isArray(response.data)
          ? response.data
          : [];

        /* Remove duplicate records */
        const uniqueServices = Array.from(
          new Map(
            data.map((service) => [
              service.nameEnglish,
              service,
            ])
          ).values()
        );

        setServices(uniqueServices);

      } catch (err) {
        console.error("Failed to fetch services:", err);

        setError(
          "Unable to load medical services. Please try again later."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="services-page">

        <section className="services-page-hero">

          <Container>

            <div className="services-hero-content">

              <span className="services-eyebrow">
                SRI KUMARAN HOSPITAL
              </span>

              <h1>
                Medical Services
                <span>& Facilities</span>
              </h1>

              <p>
                Comprehensive diagnostic, medical and
                surgical services for patient care.
              </p>

            </div>

          </Container>

        </section>


        <section className="services-loading-section">

          <Spinner
            animation="border"
            role="status"
            aria-label="Loading services"
          />

          <p>
            Loading medical services...
          </p>

        </section>

      </main>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main className="services-page">

        <section className="services-page-hero">

          <Container>

            <div className="services-hero-content">

              <span className="services-eyebrow">
                SRI KUMARAN HOSPITAL
              </span>

              <h1>
                Medical Services
                <span>& Facilities</span>
              </h1>

            </div>

          </Container>

        </section>


        <Container className="services-error-container">

          <Alert variant="danger">
            {error}
          </Alert>

        </Container>

      </main>
    );
  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main className="services-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="services-page-hero">

        <Container>

          <div className="services-hero-content">

            <span className="services-eyebrow">
              SRI KUMARAN HOSPITAL
            </span>

            <h1>
              Medical Services
              <span>& Facilities</span>
            </h1>

            <p>
              Comprehensive diagnostic, medical and surgical
              services designed to support quality patient care
              at Sri Kumaran Hospital, Manapparai.
            </p>

          </div>

        </Container>

      </section>


      {/* =====================================================
          SERVICES INTRO
      ===================================================== */}

      <section className="services-intro-section">

        <Container>

          <div className="services-intro">

            <div>

              <span className="services-section-label">
                HEALTHCARE SERVICES
              </span>

              <h2>
                Quality facilities for
                <span> better care.</span>
              </h2>

            </div>

            <p>
              From advanced diagnostics and laboratory
              services to surgical procedures, Sri Kumaran
              Hospital provides a range of healthcare
              facilities for patients and families.
            </p>

          </div>

        </Container>

      </section>


      {/* =====================================================
          SERVICE CARDS
      ===================================================== */}

      <section className="services-list-section">

        <Container>

          <Row className="g-4">

            {services.map((service, index) => {

              const image =
                serviceImages[service.nameEnglish];

              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  key={`${service.nameEnglish}-${index}`}
                >

                  <article className="services-card">

                    {/* IMAGE */}

                    <div className="services-card-image">

                      {image ? (
                        <img
                          src={image}
                          alt={service.nameEnglish}
                          loading="lazy"
                        />
                      ) : (
                        <div className="services-card-placeholder">
                          <i className="bi bi-hospital"></i>
                        </div>
                      )}

                      <span className="services-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="services-card-body">

                      <h3>
                        {service.nameEnglish}
                      </h3>

                      <p className="services-card-tamil">
                        {service.nameTamil}
                      </p>

                      <p className="services-card-description">
                        {service.descriptionEnglish}
                      </p>


                      <div className="services-card-bottom">

                        <span>
                          Sri Kumaran Hospital
                        </span>

                        <i className="bi bi-arrow-up-right"></i>

                      </div>

                    </div>

                  </article>

                </Col>
              );
            })}

          </Row>

        </Container>

      </section>


      {/* =====================================================
          MEDICAL ASSISTANCE CTA
          THIS IS LIGHT BLUE
      ===================================================== */}

      <section className="services-assistance-section">

        <Container>

          <div className="services-assistance-box">

            <div className="services-assistance-content">

              <span className="services-section-label">
                GET IN TOUCH
              </span>

              <h2>
                Need Medical Assistance?
              </h2>

              <p>
                Contact Sri Kumaran Hospital for appointments,
                service enquiries and further information.
              </p>

            </div>


            <div className="services-assistance-actions">

              <a
                href="tel:04332261444"
                className="services-call-button"
                aria-label="Call Sri Kumaran Hospital"
              >
                <i className="bi bi-telephone"></i>
                <span>Call Hospital</span>
              </a>


              <a
                href="https://wa.me/914332261444"
                target="_blank"
                rel="noopener noreferrer"
                className="services-whatsapp-button"
                aria-label="Contact Sri Kumaran Hospital on WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
                <span>WhatsApp</span>
              </a>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}

export default Services;