import { useState } from "react";
import { useEffect } from "react";

import { createContext } from "react";
import { getTheServices } from "../services/servicesService";

export const ServiceStore = createContext({
  service: [],
});
const ServiceProvider = ({ children }) => {
  const [service, addservice] = useState([]);

  const handleaddservices = (servicedata) => {
    let service = [...servicedata];
    addservice(service);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getTheServices(signal).then((data) => {
      handleaddservices(data);
    });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <ServiceStore.Provider value={{ service }}>
      {children}
    </ServiceStore.Provider>
  );
};
export default ServiceProvider;
