import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { authContext } from "./authStore";
import { getBookingData, cancelBooking } from "../services/bookingService";
import { BookingHistoryStore } from "./BookingHistoryStore";
export const BookingStore = createContext({
  bookingdata: [],
  handleCancelBooking: () => {},
  handleAddBooking: () => {},
});
const reducer = (currbookings, action) => {
  let bookingdata = currbookings;

  if (action.type === "addmultibooking") {
    bookingdata = action.payload.bookings;
  } else if (action.type === "delete") {
    bookingdata = bookingdata.filter((booking) => {
      return booking.booking_id != action.payload.id;
    });
  } else if (action.type === "deleteall") {
    bookingdata = [];
  } else if (action.type === "add") {
    bookingdata = [...bookingdata, action.payload.confirmBooking];
  }
  return bookingdata;
};
const BookingProvider = ({ children }) => {
  const { loginstate, handleuserProfile } = useContext(authContext);
  const { addCancelledBooking } = useContext(BookingHistoryStore);
  const [bookingdata, dispatch] = useReducer(reducer, []);
  const addBookings = (bookings) => {
    const action = {
      type: "addmultibooking",
      payload: {
        bookings,
      },
    };
    dispatch(action);
  };

  const handleCancelBooking = (booking_id,date,time,chefid,bookedAt) => {
    cancelBooking(booking_id,date,time,chefid,bookedAt, handleuserProfile,dispatch,addCancelledBooking).then((data) => {
      if(data){
      const action = {
        type: "delete",
        payload: {
          id: data.booking_id,
          date,
          time,chefid,bookedAt,
        },
      };
      dispatch(action);
      addCancelledBooking({
        bookinghistory_id: data.bookinghistory_id,
        chefDetail: data.chefDetail,
        date: data.date,
        time: data.time,
        price: data.price,
        address: data.address,
        bookedAt: data.bookedAt,
        modeOfPayment: data.modeOfPayment,
        status: data.status,
      });}
    });
  };

  const handleAddBooking = (booking) => {
    const confirmBooking = {
      booking_id: booking._id,
      chefDetail: booking.chef_id,
      date: booking.date,
      time: booking.time,
      price: booking.totalPrice,
      paid: booking.paid,
      address: booking.Address,
      bookedAt: booking.bookedAt,
      modeOfPayment: booking.modeOfPayment,
    };
    const action = {
      type: "add",
      payload: {
        confirmBooking,
      },
    };

    dispatch(action);
  };

  const cleanBookingFromUi = () => {
    const action = {
      type: "deleteall",
    };
    dispatch(action);
  };
  useEffect(() => {
    if (loginstate) {
      const controller = new AbortController();
      const signal = controller.signal;
      getBookingData(signal, handleuserProfile).then((data) => {
        addBookings(data);
      });
      return () => {
        controller.abort();
      };
    } else {
      cleanBookingFromUi();
    }
  }, [loginstate]);
  return (
    <BookingStore.Provider
      value={{ bookingdata, handleCancelBooking, handleAddBooking }}
    >
      {children}
    </BookingStore.Provider>
  );
};
export default BookingProvider;
