import { useContext } from "react";
import styles from "./BookingHistory.module.css";
import { BookingHistoryStore } from "../store/BookingHistoryStore";
import { authContext } from "../store/authStore";
import {Navigate,useLocation} from "react-router-dom";
const BookingHistory = () => {
  const { bookinghistory } = useContext(BookingHistoryStore);
  const{loginstate}=useContext(authContext);
  const sortedBookings = [...bookinghistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const location=useLocation();
   if(!loginstate){
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return (
    <div className={`container py-4 ${styles.bookingContainer}`}>
      <h2 className="mb-4 text-center">Your Chef Bookings History</h2>
      {sortedBookings.length === 0 ? (
        <p className="text-center">No record found.</p>
      ) : (
        <div className="row justify-content-center">
          {sortedBookings.map((booking, idx) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={idx}>
              <div className={`card shadow-sm p-3 ${styles.bookingCard}`}>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={`https://serverofchefbooking.onrender.com${booking.chefDetail.profileImage}`}
                    alt={booking.chefName}
                    className={`rounded-circle me-3 ${styles.chefPic}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <h2>{booking.chefDetail.name}</h2>
                  <div>
                    <h5 className="mb-0">{booking.chefName}</h5>
                    <small className="text-muted">{booking.speciality}</small>
                  </div>
                </div>
                <div>
                  <p className="mb-1">
                    <strong>booked at :</strong> {booking.bookedAt}
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
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          booking.status === "Completed" ? "green" : "#b8860b",
                      }}
                    >
                      {booking.status === "Completed"
                        ? `Completed`
                        : `cancelled`}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Address of booking:</strong> {booking.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BookingHistory;
