import { createContext, useContext, useState, useEffect } from "react";
import { authContext } from "./authStore";
import { getBookingHistoryData } from "../services/bookingHistoryService";

export const BookingHistoryStore = createContext({
  bookinghistory: [],
  addCancelledBooking: () => {},
});
const BookingHistoryProvider = ({ children }) => {
  const { loginstate, handleuserProfile } = useContext(authContext);
  const [bookinghistory, setbookinghistory] = useState([]);
  const addCancelledBooking = (cancelBooking) => {
    const data=[...bookinghistory,cancelBooking];
    setbookinghistory(data);
  };
  useEffect(() => {
    if (loginstate) {
      const controller = new AbortController();
      const signal = controller.signal;
      getBookingHistoryData(signal, handleuserProfile).then((data) => {
        setbookinghistory(data);
      });
      return () => {
        controller.abort();
      };
    } else {
      setbookinghistory([]);
    }
  }, [loginstate]);

  return (
    <BookingHistoryStore.Provider value={{ bookinghistory,addCancelledBooking }}>
      {children}
    </BookingHistoryStore.Provider>
  );
};
export default BookingHistoryProvider;
