import { useEffect, useState } from "react";
import api from "../services/api";

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

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/Departments");

        // Remove duplicate department names defensively
        const uniqueDepartments = response.data.filter(
          (department, index, self) =>
            index ===
            self.findIndex(
              (item) =>
                item.nameEnglish === department.nameEnglish
            )
        );

        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Unable to load departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <section className="departments-page">
        <div className="container">
          <div className="department-loading">
            Loading departments...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="departments-page">
        <div className="container">
          <div className="department-error">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="departments-page">
      <div className="container">

        {/* Header */}
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
              Explore the medical departments available at
              Sri Kumaran Hospital.
            </p>

            <span className="intro-line"></span>
          </div>

        </div>

        {/* Department Cards */}
        <div className="departments-grid">

          {departments.map((department, index) => (

            <article
              className="department-modern-card"
              key={department.id}
            >

              {/* Image */}
              <div className="department-image-wrapper">

                <img
                  src={departmentImages[department.nameEnglish]}
                  alt={`${department.nameEnglish} department`}
                  className="department-image"
                />

                <div className="department-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

              </div>

              {/* Content */}
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

                <div className="department-bottom">

                  <span>Learn more</span>

                  <i className="bi bi-arrow-right"></i>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Departments;