import { useParams } from "react-router-dom";

function DoctorDetails() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h1>Doctor Details</h1>
      <p>Doctor ID: {id}</p>
    </div>
  );
}

export default DoctorDetails;