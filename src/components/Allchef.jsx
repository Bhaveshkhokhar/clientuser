import { useContext, useState } from "react";
import styles from "./Allchef.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Chefs from "./Chefs";
import { ServiceStore } from "../store/ServicedataStore";
import { ChefsStore } from "../store/ChefdataStore";
const Allchef = () => {
  const param = useParams();
  const navigate = useNavigate();
  const type = param.type;
  const handleTypeChange = (newType) => {
    navigate(`/chefs/${newType}`);
  };
  const { service } = useContext(ServiceStore);
  const {chefs} =useContext(ChefsStore);
  return (
    <>
      <div className={`${styles["chefs"]}`} style={{ margin: "30px 80px" }}>
        <div >
          <div className="row">
            <h1 style={{ margin: "0px 0px 20px 0px ", textAlign: "center" ,textTransform: "capitalize", fontSize:"30PX"}}>
              <u>FIND THE PERFECT CHEF FOR EVERY FLAVOR AND EVENT.</u>
            </h1>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div
                className="list-group position-sticky"
                id="list-tab"
                role="tablist"
                style={{ margin: "20px 0px 0px 0px" }}
              >
                <button
                  className="list-group-item list-group-item-action"
                  style={
                    type === "All Chefs"
                      ? {
                          backgroundColor: "#C4A484",
                          color: "white",
                          borderColor: "#C4A484",
                        }
                      : {}
                  }
                  id="list-home-list"
                  data-bs-toggle="list"
                  onClick={() => handleTypeChange("All Chefs")}
                  role="tab"
                  aria-controls="list-home"
                >
                  All Chefs
                  <span
                    className="position-absolute top-50 end-0 translate-middle badge rounded-pill "
                    style={{ background: "#2c0600", color: "white" }}
                  >
                    {chefs.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                {service.map((service,idx) => (
                  <button key={idx}
                    className="list-group-item list-group-item-action "
                    style={
                      type === service.type
                        ? {
                            backgroundColor: "#C4A484",
                            color: "white",
                            borderColor: "#C4A484",
                          }
                        : {}
                    }
                    id="list-home-list"
                    data-bs-toggle="list"
                    onClick={() => handleTypeChange(service.type)}
                    role="tab"
                    aria-controls="list-home"
                  >
                    {service.type}
                    <span
                      className="position-absolute top-50 end-0 translate-middle badge rounded-pill "
                      style={{ background: "#2c0600", color: "white" }}
                    >
                      {
                        chefs.filter((chef) => chef.type === service.type)
                          .length
                      }
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-9">
              <Chefs type={type}  chefs={chefs}></Chefs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Allchef;
