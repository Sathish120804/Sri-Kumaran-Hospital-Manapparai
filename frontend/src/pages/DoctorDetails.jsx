import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import api from "../services/api";

import vijayakumarImage from "../assets/images/Dr.PL VIJAYAKUMAR ORTHO.jpg";
import palaniyappanImage from "../assets/images/Dr palaniyappan General.png";
import vigneshImage from "../assets/images/dr-vignesh-karunakaran.jpeg";

import "./DoctorDetails.css";

/* =========================================================
   DEPARTMENT IMAGES
   ========================================================= */

const departmentImages = {
  Orthopaedics:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBikzIo-q1d7kZpq9ISXw3EVDIcvNJkbYvjUa98o0nbfPzbaiYCCLRw3s&s=10",

  "Spine Surgery":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtjcWoUyVOBJnvOgta6lJMhIvlf1uXU8cmsUHu6A22Q&s=10",

  "General Medicine":
    "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?auto=format&fit=crop&w=1000&q=85",

  Cardiology:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkD9GErTJq1Ajtvg7h9fFBR7O4LDjpP4sCp8Jr9rZrHOZLEPpT7nYp1JyE&s=10",

  Paediatrics:
    "https://www.eurokidsindia.com/blog/wp-content/uploads/2023/12/right-pediatrician.jpg",

  "Department of Neurology":
    "https://padmajahospital.in/wp-content/uploads/2021/11/neurology.jpg",
};

/* =========================================================
   DOCTOR PROFILE IMAGES
   ========================================================= */

const doctorImages = {
  "Dr. P L Vijayakumar": vijayakumarImage,

  "Dr. C. Palaniappan": palaniyappanImage,

  "Dr. Vignesh Karunakaran": vigneshImage,

  "Dr. C. Renukadevi": null,
};

/* =========================================================
   DOCTOR CUSTOM DETAILS
   ========================================================= */

const doctorDetails = {
  /* =======================================================
     DR. P L VIJAYAKUMAR
     ======================================================= */

  "Dr. P L Vijayakumar": {
    profileSpecialization: "Orthopaedics & Spine Surgery",

    designation: "Chief & Founder",

    hospitalRole: "Founder, Sri Kumaran Hospital",

    experience: "15+ Years",

    registration:
      "Medical registration details available with hospital",

    introduction:
      "Dr. P L Vijayakumar is the Chief and Founder of Sri Kumaran Hospital. He is an Orthopaedic and Spine Surgery specialist providing evaluation and treatment for a range of bone, joint and spine-related conditions.",

    departments: [
      {
        number: "01",
        title: "Orthopaedics",
        tamil: "எலும்பியல்",

        description:
          "Orthopaedics focuses on the diagnosis and treatment of conditions affecting bones, joints, muscles, ligaments and the musculoskeletal system.",

        features: [
          "Bone and joint conditions",
          "Fracture management",
          "Joint pain and injuries",
          "Ligament and muscle injuries",
          "Arthritis-related conditions",
          "General orthopaedic care",
        ],
      },

      {
        number: "02",
        title: "Spine Surgery",
        tamil: "முதுகெலும்பு அறுவை சிகிச்சை",

        description:
          "Spine Surgery focuses on the assessment and management of spinal conditions, back problems and other disorders affecting the spine.",

        features: [
          "Back pain evaluation",
          "Spinal disorders",
          "Disc-related conditions",
          "Spinal injuries",
          "Nerve-related spinal conditions",
          "Spine surgical care",
        ],
      },
    ],
  },

  /* =======================================================
     DR. C. PALANIAPPAN
     ======================================================= */

  "Dr. C. Palaniappan": {
    profileSpecialization: "General Medicine & Cardiology",

    designation: "Consultant Physician",

    experience: "15+ Years",

    registration:
      "Medical registration details available with hospital",

    introduction:
      "Dr. C. Palaniappan is associated with Sri Kumaran Hospital and provides medical care for adult health conditions, general medical concerns and cardiovascular health.",

    departments: [
      {
        number: "01",
        title: "General Medicine",
        tamil: "பொதுமருத்துவம்",

        description:
          "General Medicine provides comprehensive evaluation and treatment for common adult health conditions, acute illnesses and ongoing medical concerns.",

        features: [
          "General health evaluation",
          "Fever and infections",
          "Diabetes and blood pressure care",
          "Respiratory conditions",
          "Lifestyle-related conditions",
          "General adult medical care",
        ],
      },

      {
        number: "02",
        title: "Cardiology",
        tamil: "இருதய சிகிச்சை",

        description:
          "Cardiology focuses on the evaluation and management of conditions affecting the heart and cardiovascular system.",

        features: [
          "Heart health evaluation",
          "Blood pressure management",
          "Cardiovascular risk assessment",
          "Chest pain evaluation",
          "Heart-related conditions",
          "Cardiac health guidance",
        ],
      },
    ],
  },

  /* =======================================================
     DR. VIGNESH KARUNAKARAN
     ======================================================= */

  "Dr. Vignesh Karunakaran": {
    profileSpecialization: "Neurologist",

    designation: "Consultant Neurologist",

    experience: "20 Years Overall • 5 Years as Specialist",

    registration:
      "Medical registration details available with hospital",

    introduction:
      "Dr. Vignesh Karunakaran is a Neurologist associated with Sri Kumaran Hospital, providing neurological evaluation and care for conditions affecting the brain, nerves and nervous system.",

    departments: [
      {
        number: "01",
        title: "Department of Neurology",
        tamil: "நரம்பியல் துறை",

        description:
          "Neurology focuses on the diagnosis and management of conditions involving the brain, spinal cord, nerves and nervous system.",

        features: [
          "Neurological evaluation",
          "Headache and migraine care",
          "Nerve-related conditions",
          "Seizure and epilepsy evaluation",
          "Movement-related disorders",
          "General neurological care",
        ],
      },
    ],
  },

  /* =======================================================
     DR. C. RENUKADEVI
     ======================================================= */

  "Dr. C. Renukadevi": {
    profileSpecialization: "Paediatrics",

    designation: "Paediatrician",

    experience: "1+ Year Clinical Experience",

    registration: "Registration details to be confirmed",

    introduction:
      "Dr. C. Renukadevi is associated with Sri Kumaran Hospital and provides paediatric care for newborns, infants and children. Her areas of care include newborn feeding difficulties, respiratory conditions, growth and development concerns and other childhood health conditions.",

    departments: [
      {
        number: "01",
        title: "Paediatrics",
        tamil: "குழந்தைகள் நல மருத்துவம்",

        description:
          "Paediatrics focuses on the healthcare needs of newborns, infants and children, including growth, development, feeding and common childhood health concerns.",

        features: [
          "Newborn and infant care",
          "Paediatric growth and development",
          "Feeding challenges and difficulties",
          "Respiratory conditions in newborns",
          "Newborn convulsions and related concerns",
          "General paediatric care",
        ],
      },
    ],
  },
};

/* =========================================================
   COMPONENT
   ========================================================= */

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH DOCTOR
     ======================================================= */

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/Doctors/${id}`);

        setDoctor(response.data);
      } catch (err) {
        console.error("Doctor details error:", err);

        setError(
          "Unable to load doctor details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <section className="doctor-details-page">
        <Container>
          <div className="doctor-state">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h5>Loading doctor profile...</h5>

            <p>
              Please wait while we fetch the details.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  /* =======================================================
     ERROR
     ======================================================= */

  if (error || !doctor) {
    return (
      <section className="doctor-details-page">
        <Container>
          <div className="doctor-state doctor-error-state">

            <div className="state-icon">
              <i className="bi bi-person-x"></i>
            </div>

            <h3>Doctor Profile Not Available</h3>

            <p>
              {error ||
                "The requested doctor could not be found."}
            </p>

            <Link
              to="/doctors"
              className="doctor-primary-button"
            >
              <i className="bi bi-arrow-left"></i>
              Back to Doctors
            </Link>

          </div>
        </Container>
      </section>
    );
  }

  /* =======================================================
     CUSTOM DATA
     ======================================================= */

  const customDetails =
    doctorDetails[doctor.name] || {};

  const profileImage =
    doctorImages[doctor.name] || null;

  const specialization =
    customDetails.profileSpecialization ||
    doctor.specialization ||
    "Medical Specialist";

  const designation =
    customDetails.designation ||
    specialization;

  const experience =
    customDetails.experience ||
    `${doctor.experience || 0} Years`;

  const registration =
    customDetails.registration ||
    "Registration details to be confirmed";

  const introduction =
    customDetails.introduction ||
    `${doctor.name} is associated with Sri Kumaran Hospital and provides medical care in the field of ${specialization}.`;

  const departments =
    customDetails.departments || [];

  return (
    <div className="doctor-details-page">

      {/* ===================================================
          BACK NAVIGATION
          =================================================== */}

      <section className="doctor-breadcrumb-section">
        <Container>

          <Link
            to="/doctors"
            className="doctor-back-link"
          >
            <i className="bi bi-arrow-left"></i>
            <span>Back to Our Doctors</span>
          </Link>

        </Container>
      </section>

      {/* ===================================================
          DOCTOR HERO
          =================================================== */}

      <section className="doctor-hero">

        <Container>

          <div className="doctor-hero-card">

            <Row className="g-0 align-items-stretch">

              {/* ==========================================
                  PROFILE IMAGE
                  ========================================== */}

              <Col lg={5}>

                <div className="doctor-image-area">

                  {profileImage ? (

                    <img
                      src={profileImage}
                      alt={doctor.name}
                      className="doctor-profile-image"
                    />

                  ) : (

                    <div className="doctor-profile-placeholder">

                      <div className="placeholder-circle">
                        <i className="bi bi-person"></i>
                      </div>

                      <strong>
                        {doctor.name
                          .replace("Dr. ", "")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0)
                          )
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </strong>

                      <span className="placeholder-label">
                        PROFILE PHOTO
                      </span>

                      <small>
                        {specialization}
                      </small>

                    </div>

                  )}

                </div>

              </Col>

              {/* ==========================================
                  PROFILE INFORMATION
                  ========================================== */}

              <Col lg={7}>

                <div className="doctor-hero-content">

                  <span className="doctor-eyebrow">
                    SRI KUMARAN HOSPITAL
                  </span>

                  {/* Founder badge */}

                  {doctor.name ===
                    "Dr. P L Vijayakumar" && (

                    <div className="founder-badge">
                      <i className="bi bi-star-fill"></i>
                      Chief & Founder
                    </div>

                  )}

                  <h1>
                    {doctor.name}
                  </h1>

                  <div className="doctor-designation">
                    {designation}
                  </div>

                  <div className="doctor-specialization">
                    <i className="bi bi-hospital"></i>

                    <span>
                      {specialization}
                    </span>
                  </div>

                  <div className="doctor-title-line"></div>

                  <p className="doctor-introduction">
                    {introduction}
                  </p>

                  {/* ======================================
                      INFORMATION CARDS
                      ====================================== */}

                  <div className="doctor-information-grid">

                    {/* Qualification */}

                    <div className="doctor-information-card">

                      <div className="information-icon">
                        <i className="bi bi-mortarboard-fill"></i>
                      </div>

                      <div className="information-content">

                        <span>
                          QUALIFICATION
                        </span>

                        <strong>
                          {doctor.qualification ||
                            "Medical Qualification"}
                        </strong>

                      </div>

                    </div>

                    {/* Experience */}

                    <div className="doctor-information-card">

                      <div className="information-icon">
                        <i className="bi bi-award-fill"></i>
                      </div>

                      <div className="information-content">

                        <span>
                          EXPERIENCE
                        </span>

                        <strong>
                          {experience}
                        </strong>

                      </div>

                    </div>

                    {/* Medical Registration */}

                    <div className="doctor-information-card">

                      <div className="information-icon verification-icon">
                        <i className="bi bi-shield-check"></i>
                      </div>

                      <div className="information-content">

                        <span>
                          MEDICAL REGISTRATION
                        </span>

                        <strong>
                          {registration}
                        </strong>

                      </div>

                    </div>

                    {/* Department */}

                    <div className="doctor-information-card">

                      <div className="information-icon">
                        <i className="bi bi-clipboard2-pulse-fill"></i>
                      </div>

                      <div className="information-content">

                        <span>
                          DEPARTMENT
                        </span>

                        <strong>
                          {doctor.departmentName ||
                            specialization}
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </Col>

            </Row>

          </div>

        </Container>

      </section>

      {/* ===================================================
          ABOUT DOCTOR
          =================================================== */}

      <section className="doctor-about-section">

        <Container>

          <div className="doctor-about-box">

            <div className="doctor-section-heading">

              <span>
                PROFESSIONAL PROFILE
              </span>

              <h2>
                About the Doctor
              </h2>

            </div>

            <p>
              {introduction}
            </p>

          </div>

        </Container>

      </section>

      {/* ===================================================
          AREAS OF CARE
          =================================================== */}

      <section className="doctor-care-section">

        <Container>

          <div className="doctor-section-heading center">

            <span>
              AREAS OF CARE
            </span>

            <h2>
              Medical Specialities
            </h2>

            <p>
              Specialised areas of medical care associated
              with this doctor's practice.
            </p>

          </div>

          <div className="doctor-care-list">

            {departments.map(
              (department, index) => {

                const image =
                  departmentImages[
                    department.title
                  ];

                return (
                  <div
                    className={`doctor-care-card ${
                      index % 2 !== 0
                        ? "reverse"
                        : ""
                    }`}
                    key={index}
                  >

                    <Row className="g-0 align-items-stretch">

                      {/* ==================================
                          IMAGE
                          ================================== */}

                      <Col
                        lg={5}
                        className="doctor-care-image-column"
                      >

                        <div className="doctor-care-image-wrapper">

                          {image ? (

                            <img
                              src={image}
                              alt={department.title}
                              className="doctor-care-image"
                              loading="lazy"
                            />

                          ) : (

                            <div className="doctor-care-placeholder">

                              <i className="bi bi-heart-pulse"></i>

                              <span>
                                {department.title}
                              </span>

                            </div>

                          )}

                        </div>

                      </Col>

                      {/* ==================================
                          CONTENT
                          ================================== */}

                      <Col lg={7}>

                        <div className="doctor-care-content">

                          <div className="care-number">
                            {department.number}
                          </div>

                          <div className="care-heading">

                            <span>
                              SPECIALITY
                            </span>

                            <h3>
                              {department.title}
                            </h3>

                            <small>
                              {department.tamil}
                            </small>

                          </div>

                          <p>
                            {department.description}
                          </p>

                          <div className="care-features">

                            {department.features.map(
                              (
                                feature,
                                featureIndex
                              ) => (

                                <div
                                  className="care-feature"
                                  key={
                                    featureIndex
                                  }
                                >

                                  <i className="bi bi-check-circle-fill"></i>

                                  <span>
                                    {feature}
                                  </span>

                                </div>

                              )
                            )}

                          </div>

                        </div>

                      </Col>

                    </Row>

                  </div>
                );
              }
            )}

          </div>

        </Container>

      </section>

      {/* ===================================================
          APPOINTMENT CTA
          =================================================== */}

      <section className="doctor-cta-section">

        <Container>

          <div className="doctor-cta">

            <Row className="align-items-center">

              <Col lg={8}>

                <span className="cta-eyebrow">
                  NEED MEDICAL ASSISTANCE?
                </span>

                <h2>
                  Consult Our Specialist
                </h2>

                <p>
                  Contact Sri Kumaran Hospital directly
                  for consultation enquiries and
                  appointment assistance.
                </p>

              </Col>

              <Col
                lg={4}
                className="cta-buttons-column"
              >

                <a
                  href="tel:04332261444"
                  className="doctor-call-button"
                >
                  <i className="bi bi-telephone-fill"></i>

                  <span>
                    Call Hospital
                  </span>
                </a>

                <a
                  href="https://wa.me/917397391444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doctor-whatsapp-button"
                >
                  <i className="bi bi-whatsapp"></i>

                  <span>
                    WhatsApp Enquiry
                  </span>
                </a>

              </Col>

            </Row>

          </div>

        </Container>

      </section>

    </div>
  );
}

export default DoctorDetails;