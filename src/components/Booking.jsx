import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Booking.module.css";
import { useContext, useState } from "react";
import { authContext } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../store/UserdataStore";
const Booking = ({ chef }) => {
  const { loginstate, handleuserProfile } = useContext(authContext);
  const { user } = useContext(UserStore);
  const navigate = useNavigate();

  const daysArray = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);
    daysArray.push(currentDate);
  }
  const Time = [];
  for (let i = 0; i < 15; i++) {
    Time.push({ time: 7 + i, bookingStatus: false });
  }

  const [book, setbooking] = useState({ day: "", time: "" });
  const [time, setTime] = useState(Time);

  const handleloaddayinfo = (data) => {
    const yyyy = data.getFullYear();
    const mm = String(data.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(data.getDate()).padStart(2, "0");
    const date = `${yyyy}-${mm}-${dd}`;
    const isToday =
      data.getDate() === today.getDate() &&
      data.getMonth() === today.getMonth() &&
      data.getFullYear() === today.getFullYear();
    fetch("https://serverofchefbooking.onrender.com/getbookingtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chefid: chef.id,
        date,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 404) {
            alert(data.message);
            navigate("chefs/All Chefs");
            return;
          } else if (res.status === 500) {
            alert(data.message);
            return;
          } else if (res.status === 409) {
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
          setbooking({ day: date, time: "" });
          let filteredTimes = Time;
          if (isToday) {
            const currentHour = today.getHours();
            filteredTimes = Time.filter((t) => t.time > currentHour + 3);
          }
          setTime(
            filteredTimes.map((time) => {
              if (data.times.includes(time.time)) {
                time.bookingStatus = true;
                return time;
              }
              return time;
            })
          );
        }
      })
      .catch((err) => {
        console.error("Error during getting booking info:", err);
        alert(
          "An error occurred during getting booking info. Please try again."
        );
      });
  };
  const handleTimeSet = (Time) => {
    if (Time.bookingStatus) {
      alert("chef is allread bookedat that time");
      return;
    } else {
      setbooking({ day: book.day, time: Time.time });
    }
  };
  const handleBooking = () => {
    if (loginstate) {
      if (user.status) {
        fetch("https://serverofchefbooking.onrender.com/handlePreBooking", {
          method: "POST",
          body: JSON.stringify({
            chefid: chef.id,
            bookinfo: book,
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
              if (res.status === 401) {
                alert(data.message);
                handleuserProfile(false);
                return;
              } else if(res.status===403){
                alert(data.message);
                return;
              }else if (res.status === 404) {
                alert(data.message);
                if (data.message === "user is not authenticated please login") {
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
              navigate(`/bookingDetail/${chef.id}`, {
                state: {
                  price: data.price,
                  date: book.day,
                  time: book.time,
                },
              });
            }
          })
          .catch((err) => {
            console.error("Error during booking:", err);
            alert("An error occurred during booking. Please try again.");
          });
      }else{
        alert("Your Account is Blocked from Host side for further info please contact us");
      }
    } else {
      alert("please login");
      navigate("/login");
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <>
      <center>
        <h5>Booking slot</h5>
      </center>
      <div style={{ padding: "0 10px", position: "relative" }}>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          itemClass={styles.carouselItem}
          removeArrowOnDeviceType={[
            "desktop",
            "tablet",
            "mobile",
            "superLargeDesktop",
          ]}
        >
          {daysArray.map((Date, index) => (
            <button
              type="button"
              key={index}
              className={`${styles["cardItem"]}`}
              onClick={() => handleloaddayinfo(Date)}
            >
              <pre className="mt-3">{`  ${Date.toLocaleDateString("en-US", {
                weekday: "long",
              }).substring(0, 3)}  `}</pre>
              <pre>{Date.getDate().toString()}</pre>
            </button>
          ))}
        </Carousel>
      </div>
      <div style={{ padding: "0 10px", position: "relative" }}>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          itemClass={styles.carouselItem}
          removeArrowOnDeviceType={[
            "desktop",
            "tablet",
            "mobile",
            "superLargeDesktop",
          ]}
        >
          {book.day ? (
            time.map((Time, index) => (
              <button
                type="button"
                key={index}
                className={`${styles["cardItem"]} ${
                  Time.bookingStatus ? styles["Buttoncolor"] : ""
                }`}
                onClick={() => {
                  handleTimeSet(Time);
                }}
              >
                <pre className="mt-3">
                  {Time.time < 10 ? ` ${Time.time} AM  ` : ` ${Time.time} AM `}
                </pre>
              </button>
            ))
          ) : (
            <></>
          )}
        </Carousel>
        {book.day && book.time ? (
          <center>
            <button
              type="button"
              className="btn"
              style={{ background: "#C4A484" }}
              onClick={() => {
                handleBooking();
              }}
            >
              Book now
            </button>
          </center>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Booking;
