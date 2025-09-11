import { useParams } from "react-router-dom";
import styles from "./chef.module.css";
import Booking from "./Booking";
import { useContext } from "react";
import { ChefsStore } from "../store/ChefdataStore";
const Chef = () => {
  const { chefid } = useParams();
  const { chefs } = useContext(ChefsStore);
  const chef = chefs.find((chef) => chef.id === chefid);

  if(chef===undefined){
    return <></>
  }

  return (
    <div className={styles.about}>
      <div className="container py-4">
        <div className="row align-items-center justify-content-center">
          {/* Chef Image */}
          <div className="col-12 col-lg-4 d-flex justify-content-center mb-3 mb-lg-0">
            <img
              src={`https://serverofchefbooking.onrender.com${chef.pic}`}
              className="img-fluid shadow-sm"
              alt={chef.name}
              style={{ borderRadius: "30px" }}
            />
          </div>
          {/* Chef Content */}
          <div
            className="col-12 col-lg-8 p-4 d-flex flex-column position-static border shadow-sm"
            style={{
              textAlign: "left",
              borderRadius: "30px",
              background: "#fff",
              minHeight: "220px",   
            }}
          >
            <h1 style={{ fontSize: "2rem" }}>{chef.name}</h1>
            <h4 className="mb-2" style={{ fontSize: "1.2rem" }}>
              Experience: <span className="fw-normal">{chef.experience}</span> years
            </h4>
            <div className="mb-1 text-body-secondary">
              <strong>Speciality:</strong> {chef.speciality}
            </div>
            <div className="mb-1 text-body-secondary">
              <strong>Type:</strong> {chef.type}
            </div>
            <div className="mb-1 text-body-secondary">
              <strong>Rating:</strong> {chef.rating} ⭐
            </div>
            <div className="mb-1 text-body-secondary">
              <strong>Bio:</strong> {chef.bio}
            </div>
             <div className="mb-1 text-body-secondary">
              <strong>certifications:</strong> {chef.certifications}
            </div>
             <div className="mb-1 text-body-secondary">
              <strong>Price:</strong> ₹{chef.price}
            </div>
            <div className="mb-1 text-body-secondary">
              <strong>Status:</strong>{" "}
              <span style={{ color: chef.available ? "green" : "red" }}>
                {chef.available ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <Booking  chef={chef}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chef;
