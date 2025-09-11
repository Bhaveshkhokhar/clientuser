import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className={`${styles["grad"]}`}>
        <div className="container">
          <footer className="py-5">
            <div className="container justify-content-center py-4 my-4 border-top">
              <div className="row gy-4">
                <div className="col-12 col-md-6 mb-2">
                  <a
                    href="/"
                    className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
                    aria-label="Bootstrap"
                  >
                    <img
                      width="150px"
                      height="150px"
                      src="http://localhost:3001/Chefwalelogo.png"
                      alt="ChefWale"
                    />
                  </a>
                  <p className="text-body-secondary">
                    Discover the art of fine dining with a personal chef. Book
                    now for a gourmet experience in your own home. Exceptional
                    cuisine, just a reservation away
                  </p>
                </div>
                <div className="col-12 col-md-3">
                  <h5>SECTION</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <Link to="/" className="nav-link p-0 text-body-secondary">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link
                        to="chefs/All Chefs"
                        className="nav-link p-0 text-body-secondary"
                      >
                        All Chefs
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link
                        to="/contact"
                        className="nav-link p-0 text-body-secondary"
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link
                        to="/about-us"
                        className="nav-link p-0 text-body-secondary"
                      >
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <h5>GET IN TOUCH</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <a
                        href="tel:+919968133855"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        9968133855
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="mailto:bhaveshkhokhar54@gmail.com" style={{ color: "black", textDecoration: "none" }} >
                        bhaveshkhokhar54@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center py-4 my-4 border-top gap-3">
              <p className="mb-0">© 2025 Company, Inc. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Footer;
