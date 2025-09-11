import { useContext } from "react";
import styles from "./yourbooking.module.css";
import { BookingStore } from "../store/BookingStore";
import { authContext } from "../store/authStore";
import {Navigate ,useLocation} from "react-router-dom";

// Dummy booking data (replace with real data or fetch from API/context)

const Yourbooking = () => {
  const{loginstate}=useContext(authContext);
  const location=useLocation();
  const { bookingdata, handleCancelBooking } = useContext(BookingStore);
  const sortedBookings = [...bookingdata].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  if(!loginstate){
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return (
    <div className={`container py-4 ${styles.bookingContainer}`}>
      <h2 className="mb-4 text-center">Your Chef Bookings</h2>
      {sortedBookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="row justify-content-center">
          {sortedBookings.map((booking, idx) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={idx}>
              <div className={`card shadow-sm p-3 ${styles.bookingCard}`}>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={`http://localhost:3001${booking.chefDetail.profileImage}`}
                    alt={booking.chefName}
                    className={`rounded-circle me-3 ${styles.chefPic}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <h2>{booking.chefDetail.name}</h2>
                </div>
                <div>
                  <p className="mb-1">
                    <strong>Booked at :</strong> {booking.bookedAt}
                  </p>
                  <p className="mb-1">
                    <strong>Contact Detail of Chef :</strong> {booking.chefDetail.mobile}
                  </p>
                  <p className="mb-1">
                    <strong>Date Of Booking :</strong> {booking.date}
                  </p>
                  <p className="mb-1">
                    <strong>Time Of Booking:</strong>{" "}
                    {booking.time >= 12
                      ? `${booking.time} PM`
                      : `${booking.time} AM`}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{booking.price}
                  </p>
                  <p className="mb-1">
                    <strong>Mode Of Payment :</strong> {booking.modeOfPayment}
                  </p>
                  <p className="mb-1">
                    <strong>Paid:</strong>{" "}
                    <span
                      style={{
                        color: booking.paid === true ? "green" : "#b8860b",
                      }}
                    >
                      {booking.paid ? `paid` : `not paid`}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Address of booking:</strong> {booking.address}
                  </p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className={styles.Button}
                    type="button"
                    onClick={() => {
                      handleCancelBooking(booking.booking_id,booking.date,booking.time,booking.chefDetail._id,booking.bookedAt);
                    }}
                  >
                    Cancel booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Yourbooking;
