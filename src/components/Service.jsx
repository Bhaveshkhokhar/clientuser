import { useContext } from "react";
import { ServiceStore } from "../store/ServicedataStore";
import ServiceCard from "./Servicecard";

const Service = () => {
  const { service } = useContext(ServiceStore);
  const ser = service;
  return (
    <>
      <h2>Our Services</h2>
      <p>Simply browse through our extensive list of trusted chef</p>
        <div style={{display:"flex" ,justifyContent:"space-evenly",
          flexWrap:"wrap",maxWidth:"1021px",margin:"40px"
        }}>
          {ser.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
          ))}
        </div>
    </>
  );
};
export default Service;
