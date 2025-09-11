import { Link } from "react-router-dom";
import styles from "./Servicecard.module.css";
const Servicecard = ({ service }) => {
  return (
    <>
      <Link to={`/chefs/${service.type}`} className={`btn ${styles["button"]}`}>
        <div
          className="card"
          style={{ maxWidth: "230px", background: "#C4A484",  }}
        >
          <img src={`http://localhost:3001${service.pic}`} className="card-img-top" alt={service.type} />
          <div className="card-body">
            <h5 className="card-title">{service.type}</h5>
            <p className="card-text">{service.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Servicecard;
