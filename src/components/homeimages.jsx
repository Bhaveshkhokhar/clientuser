import Carousel from "react-bootstrap/Carousel";
import styles from "./homeimages.module.css";
import { Link } from "react-router-dom";
function HomeImages() {
  return (
    <div
      style={{ maxWidth:"1000px", position: "relative", borderRadius: "16px", overflow: "hidden", margin:"40px" }}
      className={styles["imagecontainer"]}
    >
      {/* Fixed Caption */}
      <div
        style={{
          position: "absolute",
          top: "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
        <Link
          to="/chefs/All Chefs"
          style={{ color: "#203F77", textDecoration: "none" }}
        >
          BOOK NOW
        </Link>
      </div>

      {/* Carousel Slides */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", objectFit: "cover" }}
            src="https://serverofchefbooking.onrender.com/PIC2.png"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", objectFit: "cover" }}
            src="https://serverofchefbooking.onrender.com/PIC1.jpg"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "500px", objectFit: "cover" }}
            src="https://serverofchefbooking.onrender.com/PIC3.jpg"
            alt=""
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeImages;
