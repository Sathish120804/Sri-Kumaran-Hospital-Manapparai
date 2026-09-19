import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";


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
   DEPARTMENT → DOCTOR MAPPING
   =========================================================

   This maps the department name coming from the API
   to the doctor's exact name coming from the Doctors API.
*/

const departmentDoctorMap = {
  Orthopaedics: "Dr. P L Vijayakumar",

  "Spine Surgery": "Dr. P L Vijayakumar",

  "General Medicine": "Dr. C. Palaniappan",

  Cardiology: "Dr. C. Palaniappan",

  Paediatrics: "Dr. C. Renukadevi",

  "Department of Neurology":
    "Dr. Vignesh Karunakaran",
};


/* =========================================================
   COMPONENT
   ========================================================= */

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =======================================================
     FETCH DEPARTMENTS + DOCTORS
     ======================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Fetch both APIs at the same time.
         */
        const [departmentResponse, doctorResponse] =
          await Promise.all([
            api.get("/Departments"),
            api.get("/Doctors"),
          ]);


        /* ================================================
           REMOVE DUPLICATE DEPARTMENTS
           ================================================ */

        const uniqueDepartments =
          departmentResponse.data.filter(
            (department, index, self) =>
              index ===
              self.findIndex(
                (item) =>
                  item.nameEnglish ===
                  department.nameEnglish
              )
          );


        setDepartments(uniqueDepartments);

        setDoctors(doctorResponse.data);

      } catch (error) {
        console.error(
          "Error fetching departments/doctors:",
          error
        );

        setError(
          "Unable to load departments. Please try again."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <section className="departments-page">

        <div className="container">

          <div className="department-loading">

            <div
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p>
              Loading departments...
            </p>

          </div>

        </div>

      </section>
    );
  }


  /* =======================================================
     ERROR
     ======================================================= */

  if (error) {
    return (
      <section className="departments-page">

        <div className="container">

          <div className="department-error">

            <i className="bi bi-exclamation-circle"></i>

            <h3>
              Unable to Load Departments
            </h3>

            <p>
              {error}
            </p>

          </div>

        </div>

      </section>
    );
  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="departments-page">

      <div className="container">

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="departments-header">

          <div>

            <span className="page-kicker">
              OUR DEPARTMENTS
            </span>

            <h1>
              Medical
              <br />
              Departments
            </h1>

          </div>


          <div className="departments-intro">

            <p>
              Explore the medical departments available
              at Sri Kumaran Hospital and learn more
              about the specialists associated with each
              department.
            </p>

            <span className="intro-line"></span>

          </div>

        </div>


        {/* =================================================
            DEPARTMENT CARDS
            ================================================= */}

        <div className="departments-grid">

          {departments.map(
            (department, index) => {

              /*
               * Find doctor name using department name.
               */
              const doctorName =
                departmentDoctorMap[
                  department.nameEnglish
                ];


              /*
               * Find actual doctor object from API.
               */
              const doctor = doctors.find(
                (item) =>
                  item.name === doctorName
              );


              /*
               * Doctor ID is required for:
               *
               * /doctors/:id
               */
              const doctorId = doctor?.id;


              return (
                <article
                  className="department-modern-card"
                  key={department.id}
                >

                  {/* ========================================
                      IMAGE
                      ======================================== */}

                  <div className="department-image-wrapper">

                    <img
                      src={
                        departmentImages[
                          department.nameEnglish
                        ]
                      }
                      alt={`${department.nameEnglish} department`}
                      className="department-image"
                      loading="lazy"
                    />

                    <div className="department-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                  </div>


                  {/* ========================================
                      CONTENT
                      ======================================== */}

                  <div className="department-content">

                    <h2>
                      {department.nameEnglish}
                    </h2>

                    <h3>
                      {department.nameTamil}
                    </h3>

                    <p className="department-description">
                      {department.descriptionEnglish}
                    </p>


                    {/* ====================================
                        DOCTOR INFORMATION
                        ==================================== */}

                    {doctor ? (

                      <div className="department-doctor">

                        <div className="department-doctor-icon">
                          <i className="bi bi-person-badge"></i>
                        </div>

                        <div>

                          <span>
                            SPECIALIST
                          </span>

                          <strong>
                            {doctor.name}
                          </strong>

                        </div>

                      </div>

                    ) : (

                      <div className="department-doctor unavailable">

                        <div className="department-doctor-icon">
                          <i className="bi bi-person"></i>
                        </div>

                        <div>

                          <span>
                            SPECIALIST
                          </span>

                          <strong>
                            Doctor details unavailable
                          </strong>

                        </div>

                      </div>

                    )}


                    {/* ====================================
                        LEARN MORE
                        ==================================== */}

                    {doctorId ? (

                      <Link
                        to={`/doctors/${doctorId}`}
                        className="department-bottom"
                      >

                        <span>
                          Learn more about doctor
                        </span>

                        <i className="bi bi-arrow-right"></i>

                      </Link>

                    ) : (

                      <div className="department-bottom disabled">

                        <span>
                          Doctor profile unavailable
                        </span>

                        <i className="bi bi-arrow-right"></i>

                      </div>

                    )}

                  </div>

                </article>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
}

export default Departments;