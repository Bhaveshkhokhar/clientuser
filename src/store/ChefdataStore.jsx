import { createContext, useEffect, useState } from "react";
import { getTheChefs } from "../services/chefService";
export const ChefsStore = createContext({
  chefs: [],
});
const ChefProvider = ({ children }) => {
  const [chefs, setchefs] = useState([]);
  const handelesetchefs = (chefs) => {
    let Chefs = [...chefs];
    setchefs(Chefs);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getTheChefs(signal).then((chefs) => {
      handelesetchefs(chefs);
    });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <ChefsStore.Provider value={{ chefs }}>{children}</ChefsStore.Provider>
  );
};
export default ChefProvider;
