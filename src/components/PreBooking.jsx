import { useContext, useEffect, useRef, useState } from "react";
import styles from "./PreBooking.module.css";
import { UserStore } from "../store/UserdataStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChefsStore } from "../store/ChefdataStore";
import { authContext } from "../store/authStore";
import { BookingStore } from "../store/BookingStore";
const PreBooking = () => {
  const { chefs } = useContext(ChefsStore);
  const { user } = useContext(UserStore);
  const { handleAddBooking } = useContext(BookingStore);
  const { loginstate, handleuserProfile } = useContext(authContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const address = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { chefid } = useParams();
  const { price, date, time } = location.state || {};
  const chef = chefs.find((chef) => {
    return chef.id === chefid;
  });

  useEffect(() => {
    if (!location.state) {
      // If user reloaded or came directly without state, redirect
      navigate(`chef/${chefid}`);
    }
  }, [location, navigate, chef]);

  if (!location.state || !chef) return null; // prevent rendering broken state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginstate) {
      if (user.status) {
        if (location.state) {
          if (paymentMethod === "COD") {
            fetch(" http://localhost:3001/confirmBooking", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                modeOfPayment: "COD",
                chefid,
                date,
                time,
                userid: user.id,
                address: address.current.value,
              }),
            })
              .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                  if (res.status === 401) {
                    alert(data.message);
                    handleuserProfile(false);
                    return;
                  } else if(res.status==403){
                    alert(data.message);
                    return;
                  }else if (res.status === 404) {
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
                  } else if (res.status === 409) {
                    alert(data.message);
                    return;
                  } else if (res.status === 422) {
                    alert(data.message);
                    return;
                  }
                  throw new Error("getting book info fail");
                }
                return data;
              })
              .then((data) => {
                if (!data) return;
                if (data.status === "success") {
                  alert("your booking is confirmed");
                  handleAddBooking(data.confirmbooking);
                  navigate("/yourbooking");
                }
              })
              .catch((err) => {
                console.error("Error during booking:", err);
                alert("An error occurred during booking. Please try again.");
              });
          } else if (paymentMethod === "online") {
          } else {
            alert("not a valid payment method");
          }
        } else {
          alert(
            "sorry for in convient but your booking data loss please try booking again"
          );
        }
      }
      else{
         alert("Your Account is Blocked from Host side for further info please contact us");
      }
    } else {
      alert("yout token is expire please login again");
    }
  };

  return (
    <div className={styles["prebooking-container"]}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className={styles["prebooking-form"]}
      >
        <h2 className={styles["prebooking-title"]}>Confirm Your Booking</h2>
        <div className={styles["prebooking-img-wrapper"]}>
          <img
            src={`http://localhost:3001${chef.pic}`}
            alt={chef.name}
            className={styles["prebooking-img"]}
          />
          <div style={{ margin: "2rem 1rem 1rem 1rem" }}>
            <strong>{chef.name}</strong>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Date of Booking:</strong>
          <div style={{ color: "#2c0600" }}>{date}</div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Time of Booking:</strong>
          <div style={{ color: "#2c0600" }}>
            {time >= 12 ? `${time} PM` : `${time} AM`}
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Total Ammount(GST and all Tax included):</strong>
          <div style={{ color: "#2c0600" }}>₹{price}</div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="address" className={styles["prebooking-label"]}>
            Address:
          </label>
          <textarea
            id="address"
            className={styles["prebooking-textarea"]}
            defaultValue={user.address}
            ref={address}
            required
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            className={styles["prebooking-label"]}
            style={{ marginBottom: "0.5rem", display: "block" }}
          >
            Payment Method:
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <label className="form-check-label" htmlFor="cod">
              Pay on Delivery(Cash on delivery/UPI on delivery)
            </label>
          </div>
          <div className="form-check mb-2">
            {/* <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="online"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            /> */}
            <label className="form-check-label" htmlFor="online">
              Online Payment Will be available soon
            </label>
          </div>
        </div>
        <button type="submit" className={styles["prebooking-btn"]}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default PreBooking;
