import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";

const serviceImages = {
  "Spiral CT Scan":
    "https://cdn.ftvnews.com.tw/manasystem/FileData/News/dd402fc0-20f7-4f4e-9faf-d3453189732d.jpg",

  "Ultrasound and Colour Doppler Scan":
    "https://nidandiagnostic.com/assets/img/Tests/image/Echodiagram.png",

  "ECHO Scan":
    "https://nidandiagnostic.com/assets/img/Tests/image/Echodiagram.png",

  ECG:
    "https://kiranhospital.com/storage/app/public/uploads/specialities/internal_medicine_infectious_diseases/8026762162.png",

  "300 mA X-Ray Unit":
    "https://www.mmh.org.tw/upload/depimg/92/files/TABLE5.jpg",

  "24-Hour Advanced Laboratory and Blood Tests":
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=85",

  "24-Hour Pharmacy":
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=85",

  "24-Hour Blood Bank":
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=85",

  "Chief Minister's Comprehensive Health Insurance Scheme":
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",

  "Fracture Surgery":
    "https://dongnaicdc.vn/UserFiles/Images/2025/3/%C3%8A%20k%C3%ADp%20ph%E1%BA%ABu%20thu%E1%BA%ADt%20ch%C3%A2n%20cho%20b%E1%BB%87nh%20nh%C3%A2n.jpg",

  "Jaw Fracture Surgery":
    "https://imslegal.co.uk/asset/66abac4feb4ed/1_Mandibular-Fracture.jpg",

  "Spinal Surgery":
    "https://www.nepalhealthnews.com/uploads/posts/dr-basant-2-1749816856.jpg",

  "Microendoscopic Cervical Discectomy (MCD)":
    "https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319827/anterior-cervical-discectomy-and-fusion-surgery-br-image-credit-debivort-2007-br.png",

  "Advanced Joint Replacement Surgery":
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",

  "Microendoscopic Knee Surgery":
    "https://www.sanador.ro/download/editorial/Tr/at/12205/Tratament-artroscopic-pentru-ruptura-de-menisc-si-leziune-de-cartilaj-SANADOR-2.jpg",

  "Robotic Surgery":
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85",
};

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/Services");

        const uniqueServices = response.data.filter(
          (service, index, self) =>
            index ===
            self.findIndex(
              (item) => item.nameEnglish === service.nameEnglish
            )
        );

        setServices(uniqueServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Unable to load hospital services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3 mb-0">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero / Header */}
      <section className="py-5 border-bottom">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <span className="text-uppercase small fw-semibold text-primary">
                Sri Kumaran Hospital
              </span>

              <h1 className="display-5 fw-bold mt-2 mb-3">
                Medical Services & Facilities
              </h1>

              <p className="lead text-secondary mb-0">
                Comprehensive diagnostic, surgical and supportive healthcare
                services designed to support patients with accessible and
                quality medical care.
              </p>
            </Col>

            <Col lg={5}>
              <div className="bg-light rounded-4 p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="fs-1 text-primary">
                    <i className="bi bi-hospital"></i>
                  </div>

                  <div>
                    <h5 className="fw-bold mb-1">
                      Advanced Healthcare Services
                    </h5>
                    <p className="text-secondary mb-0">
                      Diagnostics, surgery, laboratory, pharmacy and emergency
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {services.map((service, index) => {
              const image =
                serviceImages[service.nameEnglish] ||
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85";

              return (
                <Col md={6} lg={4} key={service.id}>
                  <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* Image */}
                    <div
                      style={{
                        height: "220px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={image}
                        alt={service.nameEnglish}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          Service {String(index + 1).padStart(2, "0")}
                        </span>

                        <i className="bi bi-arrow-up-right-circle fs-4 text-primary"></i>
                      </div>

                      <h4 className="fw-bold mb-2">
                        {service.nameEnglish}
                      </h4>

                      <p className="text-primary fw-semibold mb-3">
                        {service.nameTamil}
                      </p>

                      <p className="text-secondary mb-0">
                        {service.descriptionEnglish}
                      </p>
                    </div>
                  </article>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center">
            <h2 className="fw-bold mb-3">
              Need Medical Assistance?
            </h2>

            <p className="text-secondary mb-4">
              Contact Sri Kumaran Hospital for appointments and service
              enquiries.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a
                href="tel:04332261444"
                className="btn btn-primary px-4 py-2 rounded-pill"
              >
                <i className="bi bi-telephone-fill me-2"></i>
                Call Hospital
              </a>

              <a
                href="https://wa.me/919843300999"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success px-4 py-2 rounded-pill"
              >
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Services;