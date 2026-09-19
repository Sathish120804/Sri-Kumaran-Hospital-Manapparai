import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import api from "../services/api";

import vijayakumarImage from "../assets/images/Dr.PL VIJAYAKUMAR ORTHO.jpg";
import palaniyappanImage from "../assets/images/Dr palaniyappan General.png";
import vigneshImage from "../assets/images/dr-vignesh-karunakaran.jpeg";

import "./DoctorDetails.css";


/* =========================================================
   DOCTOR IMAGES
========================================================= */

const doctorImages = {

  "Dr. P L Vijayakumar":
    vijayakumarImage,

  "Dr. C. Palaniappan":
    palaniyappanImage,

  "Dr. Vignesh Karunakaran":
    vigneshImage,

};


/* =========================================================
   DOCTOR DETAILS
========================================================= */

const doctorDetails = {


  /* =======================================================
     DR. P L VIJAYAKUMAR
  ======================================================= */

  "Dr. P L Vijayakumar": {

    profileSpecialization:
      "Orthopaedics & Spine Surgery",

    email:
      "dr.vijayakumar@srikumaranhospital.example",

    phone:
      "04332 260999",

    introduction:
      "Dr. P. L. Vijayakumar is associated with Orthopaedics and Spine Surgery, with a focus on the evaluation and treatment of bone, joint, musculoskeletal and spine-related conditions.",

    departments: [

      {
        number: "01",

        title: "Orthopaedics",

        tamil: "எலும்பு, மூட்டு",

        description:
          "Orthopaedics focuses on conditions affecting the bones, joints, muscles and musculoskeletal system. Clinical care may include evaluation and treatment for fractures, joint-related problems, movement difficulties and other orthopaedic conditions.",

        features: [
          "Bone and joint conditions",
          "Fracture-related care",
          "Musculoskeletal conditions",
          "Joint-related problems",
        ],

        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBikzIo-q1d7kZpq9ISXw3EVDIcvNJkbYvjUa98o0nbfPzbaiYCCLRw3s&s=10",
      },


      {
        number: "02",

        title: "Spine Surgery",

        tamil:
          "முதுகெலும்பு அறுவை சிகிச்சை",

        description:
          "Spine Surgery focuses on the evaluation and surgical management of selected conditions affecting the spine. Treatment planning depends on the patient's condition, clinical findings and medical assessment.",

        features: [
          "Spine-related conditions",
          "Back and neck problems",
          "Spinal surgical evaluation",
          "Post-treatment follow-up",
        ],

        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtjcWoUyVOBJnvOgta6lJMhIvlf1uXU8cmsUHu6A22Q&s=10",
      },

    ],
  },


  /* =======================================================
     DR. C. PALANIAPPAN
  ======================================================= */

  "Dr. C. Palaniappan": {

    profileSpecialization:
      "General Medicine & Heart Care",

    email:
      "dr.palaniappan@srikumaranhospital.example",

    phone:
      "04332 260998",

    introduction:
      "Dr. C. Palaniappan is associated with General Medicine and cardiac care, providing medical evaluation and treatment for a range of adult health conditions with attention to cardiovascular health and related concerns.",

    departments: [

      {
        number: "01",

        title: "General Medicine",

        tamil:
          "பொதுமருத்துவம்",

        description:
          "General Medicine provides comprehensive evaluation and management of common and complex medical conditions affecting adults. Care includes clinical assessment, diagnosis, treatment planning and appropriate follow-up based on individual patient needs.",

        features: [
          "General health evaluation",
          "Adult medical conditions",
          "Diagnosis and treatment planning",
          "Ongoing medical follow-up",
        ],

        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
      },


      {
        number: "02",

        title: "Cardiology & Heart Care",

        tamil:
          "இருதய சிகிச்சை",

        description:
          "Cardiology and heart care focuses on the evaluation of cardiovascular health and heart-related concerns. Clinical assessment may include reviewing symptoms, medical history and relevant investigations to support appropriate treatment planning.",

        features: [
          "Heart health evaluation",
          "Cardiovascular risk assessment",
          "Blood pressure monitoring",
          "ECG and cardiac evaluation",
        ],

        image:
          "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=85",
      },

    ],
  },


  /* =======================================================
     DR. VIGNESH KARUNAKARAN
  ======================================================= */

  "Dr. Vignesh Karunakaran": {

    profileSpecialization:
      "Neurology",

    email:
      "dr.vignesh@srikumaranhospital.example",

    phone:
      "04332 260997",

    introduction:
      "Dr. Vignesh Karunakaran is a Neurologist with experience in the evaluation and management of neurological conditions. His qualifications include MBBS, MD in Pediatrics and DM in Neurology.",

    experience:
      "20 Years Experience Overall • 5 Years as Specialist",

    registration:
      "Medical Registration Verified",

    departments: [

      {
        number: "01",

        title: "Neurology",

        tamil:
          "நரம்பியல் துறை",

        description:
          "Neurology focuses on the diagnosis, evaluation and management of conditions affecting the brain, spinal cord, nerves and nervous system. Neurological care may involve detailed clinical assessment, investigations and individualized treatment planning.",

        features: [
          "Neurological evaluation",
          "Brain and nervous system conditions",
          "Nerve-related conditions",
          "Neurological follow-up",
        ],

        image:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",
      },

    ],
  },

};


/* =========================================================
   COMPONENT
========================================================= */

function DoctorDetails() {

  const { id } = useParams();

  const [doctor, setDoctor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     FETCH DOCTOR
  ======================================================= */

  useEffect(() => {

    const fetchDoctor = async () => {

      try {

        const response =
          await api.get(`/Doctors/${id}`);

        setDoctor(response.data);

      } catch (err) {

        console.error(
          "Error fetching doctor:",
          err
        );

        setError(
          "Unable to load doctor profile."
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

      <section className="doctor-details-status">

        <div className="doctor-details-loader"></div>

        <p>
          Loading doctor profile...
        </p>

      </section>

    );
  }


  /* =======================================================
     API ERROR
  ======================================================= */

  if (error || !doctor) {

    return (

      <section className="doctor-details-status">

        <i className="bi bi-person-x"></i>

        <h3>
          Doctor profile unavailable
        </h3>

        <p>
          {error ||
            "Doctor information could not be found."}
        </p>

        <Link
          to="/doctors"
          className="doctor-back-button"
        >

          <i className="bi bi-arrow-left"></i>

          Back to Doctors

        </Link>

      </section>

    );
  }


  /* =======================================================
     CUSTOM DETAILS
  ======================================================= */

  const customDetails =
    doctorDetails[doctor.name];


  /* =======================================================
     PROFILE NOT FOUND
  ======================================================= */

  if (!customDetails) {

    return (

      <section className="doctor-details-status">

        <i className="bi bi-person-x"></i>

        <h3>
          Doctor profile unavailable
        </h3>

        <p>
          Detailed profile information is
          currently unavailable.
        </p>

        <Link
          to="/doctors"
          className="doctor-back-button"
        >

          <i className="bi bi-arrow-left"></i>

          Back to Doctors

        </Link>

      </section>

    );
  }


  /* =======================================================
     DOCTOR IMAGE
  ======================================================= */

  const image =
    doctorImages[doctor.name];


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <main className="doctor-details-page">


      {/* =================================================
          DOCTOR HERO
      ================================================= */}

      <section className="doctor-profile-hero">

        <Container>


          {/* BREADCRUMB */}

          <div className="doctor-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <i className="bi bi-chevron-right"></i>

            <Link to="/doctors">
              Doctors
            </Link>

            <i className="bi bi-chevron-right"></i>

            <span>
              {doctor.name}
            </span>

          </div>


          <Row
            className="
              align-items-center
              doctor-profile-row
            "
          >


            {/* =========================================
                DOCTOR IMAGE
            ========================================= */}

            <Col lg={5}>

              <div className="doctor-profile-image">

                {image ? (

                  <img
                    src={image}
                    alt={doctor.name}
                  />

                ) : (

                  <div
                    className="
                      doctor-profile-placeholder
                    "
                  >

                    <i className="bi bi-person"></i>

                  </div>

                )}

              </div>

            </Col>


            {/* =========================================
                DOCTOR INFORMATION
            ========================================= */}

            <Col lg={7}>

              <div className="doctor-profile-content">


                <span
                  className="
                    doctor-profile-kicker
                  "
                >
                  {customDetails.profileSpecialization}
                </span>


                <h1>
                  {doctor.name}
                </h1>


                <p
                  className="
                    doctor-profile-qualification
                  "
                >
                  {doctor.qualification}
                </p>


                {customDetails.experience && (

                  <div
                    className="
                      doctor-profile-experience
                    "
                  >

                    <i className="bi bi-briefcase"></i>

                    <span>
                      {customDetails.experience}
                    </span>

                  </div>

                )}


                {customDetails.registration && (

                  <div
                    className="
                      doctor-profile-registration
                    "
                  >

                    <i className="bi bi-patch-check-fill"></i>

                    <span>
                      {customDetails.registration}
                    </span>

                  </div>

                )}


                <p
                  className="
                    doctor-profile-introduction
                  "
                >
                  {customDetails.introduction}
                </p>


                {/* CONTACT CARDS */}

                <div
                  className="
                    doctor-contact-box
                  "
                >


                  {/* PHONE */}

                  <div
                    className="
                      doctor-contact-item
                    "
                  >

                    <div
                      className="
                        doctor-contact-icon
                      "
                    >

                      <i
                        className="
                          bi bi-telephone
                        "
                      ></i>

                    </div>

                    <div>

                      <span>
                        Contact
                      </span>

                      <strong>
                        {customDetails.phone}
                      </strong>

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div
                    className="
                      doctor-contact-item
                    "
                  >

                    <div
                      className="
                        doctor-contact-icon
                      "
                    >

                      <i
                        className="
                          bi bi-envelope
                        "
                      ></i>

                    </div>

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {customDetails.email}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* CONTACT BUTTON */}

                <Link
                  to="/contact"
                  className="
                    doctor-appointment-button
                  "
                >

                  Contact Hospital

                  <i
                    className="
                      bi bi-arrow-up-right
                    "
                  ></i>

                </Link>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =================================================
          AREAS OF CARE
      ================================================= */}

      <section
        className="
          doctor-specializations-section
        "
      >

        <Container>


          <div
            className="
              doctor-section-heading
            "
          >

            <span>
              Areas of Care
            </span>

            <h2>

              Specializations &{" "}

              <em>
                Departments
              </em>

            </h2>

            <p>

              Explore the departments associated
              with {doctor.name} and the areas of
              care covered within these specialties.

            </p>

          </div>


          {/* =================================================
              DEPARTMENT SECTIONS
          ================================================= */}

          {customDetails.departments.map(
            (department, index) => (

              <article
                className={`
                  department-detail
                  ${
                    index % 2 !== 0
                      ? "department-reverse"
                      : ""
                  }
                `}
                key={department.title}
              >

                <Row
                  className="
                    align-items-center
                  "
                >


                  {/* =======================================
                      IMAGE
                  ======================================= */}

                  <Col lg={6}>

                    <div
                      className="
                        department-detail-image
                      "
                    >

                      <img
                        src={department.image}
                        alt={`${department.title} department`}
                      />


                      <div
                        className="
                          department-image-label
                        "
                      >

                        <span>
                          {department.number}
                        </span>

                        <strong>
                          {department.title}
                        </strong>

                      </div>

                    </div>

                  </Col>


                  {/* =======================================
                      CONTENT
                  ======================================= */}

                  <Col lg={6}>

                    <div
                      className="
                        department-detail-content
                      "
                    >

                      <span
                        className="
                          department-detail-kicker
                        "
                      >
                        {department.title}
                      </span>


                      <h3>
                        {department.tamil}
                      </h3>


                      <p
                        className="
                          department-description
                        "
                      >
                        {department.description}
                      </p>


                      <div
                        className="
                          department-features
                        "
                      >

                        {department.features.map(
                          (feature) => (

                            <div
                              className="
                                department-feature
                              "
                              key={feature}
                            >

                              <span
                                className="
                                  feature-icon
                                "
                              >

                                <i
                                  className="
                                    bi bi-check2
                                  "
                                ></i>

                              </span>

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

              </article>

            )
          )}

        </Container>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section
        className="
          doctor-details-cta
        "
      >

        <Container>

          <div
            className="
              doctor-cta-inner
            "
          >

            <div>

              <span>
                Need Medical Assistance?
              </span>

              <h2>
                Contact Sri Kumaran Hospital
              </h2>

              <p>
                For appointments and further
                information, please contact the
                hospital directly.
              </p>

            </div>


            <div
              className="
                doctor-cta-actions
              "
            >

              <a
                href="tel:04332261444"
                className="cta-phone"
              >

                <i
                  className="
                    bi bi-telephone
                  "
                ></i>

                Call Hospital

              </a>


              <Link
                to="/contact"
                className="cta-contact"
              >

                Contact Us

                <i
                  className="
                    bi bi-arrow-up-right
                  "
                ></i>

              </Link>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}


export default DoctorDetails;