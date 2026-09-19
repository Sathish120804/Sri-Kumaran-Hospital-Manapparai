import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import api from "../services/api";

import vijayakumarImage from "../assets/images/Dr.PL VIJAYAKUMAR ORTHO.jpg";
import palaniyappanImage from "../assets/images/Dr palaniyappan General.png";
import vigneshImage from "../assets/images/dr-vignesh-karunakaran.jpeg";




/* =========================================================
   DOCTOR IMAGES
========================================================= */

const doctorImages = {
  "Dr. P L Vijayakumar": {
    image: vijayakumarImage,
    type: "photo",
  },

  "Dr. C. Palaniappan": {
    image: palaniyappanImage,
    type: "photo",
  },

  "Dr. Vignesh Karunakaran": {
    image: vigneshImage,
    type: "photo",
  },
};


/* =========================================================
   COMPONENT
========================================================= */

function Doctors() {

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     FETCH DOCTORS
  ======================================================= */

  const fetchDoctors = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get("/Doctors");

      setDoctors(response.data);

    } catch (err) {

      console.error(
        "Error fetching doctors:",
        err
      );

      setError(
        "Unable to load doctors."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchDoctors();

  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <section className="doctors-page">

        <Container>

          <div className="doctor-status">

            <div className="doctor-loader"></div>

            <p>
              Loading doctors...
            </p>

          </div>

        </Container>

      </section>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {

    return (

      <section className="doctors-page">

        <Container>

          <div className="doctor-status doctor-error">

            <i className="bi bi-person-x"></i>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="doctor-retry"
              onClick={fetchDoctors}
            >
              Try Again
            </button>

          </div>

        </Container>

      </section>
    );
  }


  /* =======================================================
     UI
  ======================================================= */

  return (

    <main className="doctors-page">

      <Container>


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="doctors-header">

          <div>

            <span className="page-kicker">
              Our Medical Team
            </span>

            <h1>
              Meet Our
              <br />

              <span>Doctors</span>
            </h1>

          </div>


          <div className="doctors-intro">

            <p>
              Our medical team brings together
              experienced professionals across
              different areas of healthcare,
              providing dedicated care for every
              patient.
            </p>

            <span className="intro-line"></span>

          </div>

        </div>


        {/* =================================================
            DOCTOR GRID
        ================================================= */}

        <Row className="doctor-grid">

          {doctors.map((doctor) => {

            const doctorImage =
              doctorImages[doctor.name];


            return (

              <Col
                xs={12}
                md={6}
                lg={4}
                key={doctor.id}
              >

                <article className="doctor-card">


                  {/* =======================================
                      IMAGE
                  ======================================= */}

                  <div className="doctor-image-wrapper">

                    {doctorImage ? (

                      <img
                        src={doctorImage.image}
                        alt={doctor.name}
                        className="doctor-image"
                      />

                    ) : (

                      <div className="doctor-placeholder">

                        <i className="bi bi-person-vcard"></i>

                      </div>

                    )}

                  </div>


                  {/* =======================================
                      CONTENT
                  ======================================= */}

                  <div className="doctor-content">


                    <span className="doctor-specialization">

                      {doctor.specialization}

                    </span>


                    <h2>
                      {doctor.name}
                    </h2>


                    <p className="doctor-qualification">

                      {doctor.qualification}

                    </p>


                    <div className="doctor-divider"></div>


                    <div className="doctor-meta">

                      <span>

                        <i className="bi bi-briefcase"></i>

                        {doctor.experience}{" "}

                        {doctor.experience === 1
                          ? "Year"
                          : "Years"}{" "}

                        Experience

                      </span>

                    </div>


                    {/* ===================================
                        VIEW PROFILE
                    =================================== */}

                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="doctor-view-link"
                    >

                      <span>
                        View Doctor Profile
                      </span>

                      <span className="doctor-arrow">

                        <i className="bi bi-arrow-up-right"></i>

                      </span>

                    </Link>

                  </div>

                </article>

              </Col>

            );
          })}

        </Row>

      </Container>

    </main>
  );
}


export default Doctors;