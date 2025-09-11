import styles from "./Chefcard.module.css";
import { Link } from "react-router-dom";
const Chefcard = ({ chef }) => {
  const filledStars = Math.floor(chef.rating);
  const hasHalfStar =
    chef.rating - filledStars >= 0.25 && chef.rating - filledStars < 0.75;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  return (
    <>
      <Link
        to={`/chef/${chef.id}`}
        className={`btn ${styles["button"]}`}
        style={{ padding: "0px" }}
      >
        <div
          className="card"
          style={{
            width: "200px",
            height: "350px",
            background: "#C4A484",
            margin: "10px",
          }}
        >
          <img
          style={{maxWidth:"100%",
            maxHeight:"140px"
          }}
            src={`http://localhost:3001${chef.pic}`}
            className="card-img-top"
            alt={chef.name}
          />
          <div className="card-body" style={{ textAlign: "left" }}>
            <h6 className="card-title">{chef.name}</h6>
            <div className="card-text">
              <p style={{ margin: "2px" }}>speciality: {chef.speciality}</p>
              <p style={{ margin: "2px" }}>service: {chef.type}</p>
              <p style={{ margin: "2px" }}>
                {"★".repeat(filledStars)}
                {hasHalfStar && "⯪"}
                {/* or use ⯪, or 🌓 for half-filled simulation */}
                {"☆".repeat(emptyStars)}
                <span className="text-muted small"> {chef.rating}</span>
              </p>
              <li className={`${chef.available ? styles["green"] : styles["red"]}`}>
                {chef.available ? "available" : "not available"}
              </li>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Chefcard;
