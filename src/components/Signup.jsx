import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { authContext } from "../store/authStore";
import { useContext, useRef, useState, useEffect } from "react";

const Signup = () => {
  const { handleuserProfile } = useContext(authContext);

  const navigate = useNavigate();
  const rememberMe=useRef();
  const Number = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();
  const Name = useRef();
  const otp = useRef();

  const [otpflag, setOtp] = useState(
    false
    //     () => {
    //   const stored = localStorage.getItem("otpflag");
    //   return stored === "true"; // convert string to boolean
    // }
  );

  useEffect(() => {
    if (otpflag && otp.current) {
      otp.current.focus();
    }
  }, [otpflag]);

  const handleotpverification = (event) => {
    event.preventDefault();

    if (!otpflag) {
      // validate name
      const isName = /^[a-zA-Z\s]+$/.test(Name.current.value.trim());
      if (!isName || Name.current.value.trim() === "") {
        alert("please enter a valid name");
        Name.current.focus();
        return;
      }
      // validate  number
      const isNumber = /^[0-9]+$/.test(Number.current.value.trim());
      if (!isNumber || Number.current.value.length !== 10) {
        alert("please enter a valid mobile number");
        Number.current.focus();
        return;
      }

      // validate password and confirm password
      if (Password.current.value !== ConfirmPassword.current.value) {
        alert("password and confirm password do nat match");
        ConfirmPassword.current.focus();
        return;
      }

      fetch("https://serverofchefbooking.onrender.com/otpverification", {
        method: "POST",
        body: JSON.stringify({
          Name: Name.current.value,
          Number: Number.current.value,
          Password: Password.current.value,
          ConfirmPassword: ConfirmPassword.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      })
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            if (res.status === 422) {
              alert(data.message);
              if (data.field === "Name") {
                Name.current.focus();
              } else if (data.field === "Number") {
                Number.current.focus();
              } else if (data.field === "Password") {
                Password.current.focus();
              } else {
                ConfirmPassword.current.focus();
              }
              return;
            }

            if (res.status === 404) {
              alert("Mobile number already has an account");
              Number.current.focus();
              return;
            }

            if (res.status === 500) {
              alert(
                "Internal server error during signup please try again later."
              );
              return;
            }

            throw new Error("Signup failed");
          }

          // everything okay
          return data;
        })
        .then((data) => {
          if (!data) return;
          if (data.status === "otp generated") {
            setOtp(true);
            alert("otp sent to your mobile number");
          }
        })
        .catch((err) => {
          console.error("Error during signup:", err);
          alert("An error occurred during signup. Please try again.");
        });
    } else {
      // validate otp
      const isOtp = /^[0-9]+$/.test(otp.current.value.trim());
      if (!isOtp || otp.current.value.length !== 4) {
        alert("please enter a valid otp");
        otp.current.focus();
        return;
      }

      fetch("https://serverofchefbooking.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify({
          Otp: otp.current.value,
          rememberMe:rememberMe.current.checked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      })
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            if (res.status === 400) {
              alert(data.message);
              if (data.message === "OTP session expired or not found") {
                setOtp(false);
                // localStorage.setItem("otpflag", "false");
                Name.current.value = "";
                Number.current.value = "";
                Password.current.value = "";
                ConfirmPassword.current.value = "";
                Name.current.focus();
              } else {
                otp.current.focus();
              }
              return;
            }

            if (res.status === 500) {
              alert(
                "Internal server error during signup please try again later."
              );
              return;
            }

            throw new Error("Signup failed");
          }

          // everything okay
          return data;
        })
        .then((data) => {
          if (!data) return;
          if (data.status === "success") {
            setOtp(false);
            // localStorage.setItem("otpflag", "false");
            Number.current.value = "";
            Password.current.value = "";
            ConfirmPassword.current.value = "";
            alert("User signed up successfully");
            handleuserProfile(true);
            navigate("/profiledetailAdd", {
              state: { Name: Name.current.value },
            });
          }
        })
        .catch((err) => {
          console.error("Error during signup:", err);
          alert("An error occurred during signup. Please try again.");
        });
    }
  };
  return (
    <>
      <div
        className="modal modal-sheet position-static d-block  p-4 py-md-5"
        tabindex="-1"
        role="dialog"
        id="modalSignin"
      >
        {" "}
        <div className="modal-dialog">
          {" "}
          <div
            className="modal-content rounded-5 shadow"
            style={{ backgroundColor: "#C4A484", color: "white" }}
          >
            <div className="w-100 d-flex justify-content-center mt-4 mb-0 ">
              <img
                src="https://serverofchefbooking.onrender.com/Chefwalelogo.png"
                alt="ChefWale Logo"
                style={{ width: "90px", height: "90px", objectFit: "contain" }}
              />
            </div>{" "}
            <div className="modal-header p-2 pb-4 border-bottom-0 justify-content-center">
              {" "}
              <h1 className="fw-bold mb-0 fs-2">Sign up</h1>{" "}
            </div>{" "}
            <div className="modal-body p-5 pt-0">
              {" "}
              <form
                className=""
                onSubmit={(event) => {
                  handleotpverification(event);
                }}
              >
                {" "}
                <div className="form-floating mb-3 text-center">
                  {" "}
                  <small className=" mb-3">
                    Please Sign up to booking now
                  </small>{" "}
                </div>{" "}
                <div className="form-floating mb-3">
                  {" "}
                  <input
                    ref={Name}
                    type="text"
                    className="form-control rounded-3"
                    id="name"
                    placeholder="name"
                    disabled={otpflag}
                    required
                  />{" "}
                  <label for="name">name</label>{" "}
                </div>{" "}
                <div className="form-floating mb-3">
                  {" "}
                  <input
                    ref={Number}
                    maxLength={10}
                    minLength={10}
                    type="text"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="mobile number"
                    disabled={otpflag}
                    required
                  />{" "}
                  <label for="floatingInput">Mobile number</label>{" "}
                </div>{" "}
                <div className="form-floating mb-3">
                  {" "}
                  <input
                    ref={Password}
                    type="password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    disabled={otpflag}
                    required
                  />{" "}
                  <label for="floatingPassword">Create new Password</label>{" "}
                </div>{" "}
                <div className="form-floating mb-3">
                  {" "}
                  <input
                    ref={ConfirmPassword}
                    type="password"
                    className="form-control rounded-3"
                    id="confirmPassword"
                    placeholder="confirmPassword"
                    disabled={otpflag}
                    required
                  />{" "}
                  <label for="confirmPassword">Confirm new Password</label>{" "}
                </div>{" "}
                <button
                  className={`${styles["signup-pop-button"]} w-100 mb-2 btn btn-lg rounded-3`}
                  type="submit"
                  style={{ backgroundColor: "white", color: "#2c0600" }}
                  disabled={otpflag}
                >
                  Sent OTP
                </button>{" "}
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary underline cursor-pointer"
                  >
                    Login here
                  </Link>
                </p>
                {otpflag && (
                  <>
                    <div className="form-floating mb-3">
                      {" "}
                      <input
                        ref={otp}
                        type="text"
                        className="form-control rounded-3"
                        id="otp"
                        placeholder="Enter otp here"
                        required
                      />{" "}
                      <label for="otp">Enter otp here</label>{" "}
                    </div>
                    <div className="form-check text-start my-3">
                      {" "}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="checkDefault"
                        ref={rememberMe}
                      />{" "}
                      <label className="form-check-label" for="checkDefault">
                        Remember me
                      </label>{" "}
                    </div>
                    <button
                      className={`${styles["signup-pop-button"]} w-100 mb-2 btn btn-lg rounded-3`}
                      type="submit"
                      style={{ backgroundColor: "white", color: "#2c0600" }}
                    >
                      Signup
                    </button>
                  </>
                )}
              </form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};
export default Signup;
