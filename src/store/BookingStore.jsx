import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { authContext } from "./authStore";
import { UserStore } from "./UserdataStore";
import { getBookingData, cancelBooking } from "../services/bookingService";
import { BookingHistoryStore } from "./BookingHistoryStore";
export const BookingStore = createContext({
  bookingdata: [],
  handleCancelBooking: () => {},
  handleAddBooking: () => {},
  handleRetryPayment: () => {},
  handleUpdateBooking: () => {},
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
  } else if (action.type === "updatePayment") {
    bookingdata = bookingdata.map((booking) => {
      if (booking.booking_id === action.payload.updatedBooking_id) {
        return { ...booking, paid: true };
      }
      return booking;
    });
  }
  else if(action.type === "updateModeOfPayment"){
    bookingdata = bookingdata.map((booking) => {
      if (booking.booking_id === action.payload.updatedBooking_id) {    
        return { ...booking, modeOfPayment: "ONLINE" };
      }
      return booking;
    });
  }
  return bookingdata;
};
const BookingProvider = ({ children }) => {
  const { loginstate, handleuserProfile } = useContext(authContext);
  const { addCancelledBooking } = useContext(BookingHistoryStore);
  const { user } = useContext(UserStore);
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

  const handleRetryPayment = (booking_id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/retryPayment`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                booking_id,
              }),
            })
              .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                  if (res.status === 401) {
                    alert(data.message);
                    handleuserProfile(false);
                    return;
                  } else if (res.status == 403) {
                    alert(data.message);
                    return;
                  } else if (res.status === 404) {
                    alert(data.message);
                    if (
                      data.message === "user is not authenticated please login"
                    ) {
                      handleuserProfile(false);
                    } else {
                      navigate("chefs/All Chefs");
                    }
                    return;
                  } else if (res.status === 500) {
                    alert(data.message);
                    return;
                  }  else if (res.status === 422) {
                    alert(data.message);
                    return;
                  }
                  throw new Error("getting book info fail");
                }
                return data;
              })
              .then(async (data) => {
                if (!data) return;
                handleUpdateModeOfPayment(data.booking_id);
                //add code here also after getting response verify payment add cofirm booking and then navigate to your booking page
                const options = {
                  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                  amount: data.order.amount,
                  currency: data.order.currency,
                  name: "Chef Booking",
                  description: "Booking Payment",
                  order_id: data.order.id,

                  handler: function (response) {
                    // ✅ VERIFY PAYMENT
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/verifyPayment`, {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(response),
                    })
                      .then((res) => {
                        if (!res.ok) {
                          if (res.status === 401) {
                            alert(data.message);
                            handleuserProfile(false);
                            return;
                          } else if (res.status == 403) {
                            alert(data.message);
                            return;
                          } else if (res.status === 404) {
                            alert(data.message);
                            if (
                              data.message ===
                              "User not found please sign in"
                            ) {
                              handleuserProfile(false);
                            } else {
                              navigate("chefs/All Chefs");
                            }
                            return;
                          } else if (res.status === 500) {
                            alert(data.message);
                            return;
                          }
                          throw new Error("Payment verification failed");
                        }
                        return res.json();
                      })
                      .then((data) => {
                        if (!data) return;
                        if (data.status === "success") {
                          alert("your booking is confirmed");
                          handleUpdateBooking(data.confirmbooking_id);
                        }
                      })
                      .catch(() => {
                        alert("Verification failed");
                      });
                  },

                  prefill: {
                    name: user.name,
                    contact: user.mobile,
                  },

                  theme: {
                    color: "#3399cc",
                  },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
              })
              .catch((err) => {
                console.error("Error during booking:", err);
                alert("An error occurred during booking. Please try again.");
              });

  }

  const handleUpdateModeOfPayment = (updatedBooking_id) => {
    const action ={
      type:"updateModeOfPayment",
      payload:{
        updatedBooking_id,
      }
    };
    dispatch(action);
  };

  const handleUpdateBooking = (updatedBooking_id) => {
    const action = {
      type: "updatePayment",
      payload: {
        updatedBooking_id,
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
      value={{ bookingdata, handleCancelBooking, handleAddBooking,handleRetryPayment,handleUpdateBooking }}
    >
      {children}
    </BookingStore.Provider>
  );
};
export default BookingProvider;
