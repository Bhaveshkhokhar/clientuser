import { useRef,useContext } from "react";
import styles from "./ProfileDetailUpdate.module.css";
import {
  FaUser,
  FaEnvelope,
  FaHome,
  FaTransgender,
  FaBirthdayCake,
} from "react-icons/fa";
import { useNavigate, Navigate,useLocation } from "react-router-dom";
import { authContext } from "../store/authStore";
import { UserStore } from "../store/UserdataStore";

const ProfileDetailUpdate = () => {
  const { loginstate,handleuserProfile } = useContext(authContext);
  const { user, handleUpdate } = useContext(UserStore);
  const navigate = useNavigate();
  const location=useLocation();
  const Name = useRef();
  const Email = useRef();
  const Address = useRef();
  const Birthdate = useRef();
  const Gender = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isName = /^[a-zA-Z\s]+$/.test(Name.current.value.trim());
    if (!isName || Name.current.value.trim() === "") {
      alert("please enter a valid name");
      Name.current.focus();
      return;
    }
    fetch("http://localhost:3001/updateUserData", {
      method: "POST",
      body: JSON.stringify({
        Name: Name.current.value,
        Email: Email.current.value,
        Gender: Gender.current.value,
        Address: Address.current.value,
        Birthdate: Birthdate.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 422) {
            alert(data.message);
            if (data.field === "Name") {
              Name.current.focus();
            } else if (data.field === "Email") {
              Email.current.focus();
            } else if (data.field === "Gender") {
              Gender.current.focus();
            } else {
              Birthdate.current.focus();
            }
            return;
          } else if (res.status == 401) {
            alert(data.message);
            handleuserProfile(data.isLoggedIn);
            navigate("/login");
            return;
          } else if (res.status == 404) {
            alert(data.message);
            handleuserProfile(data.isLoggedIn);
            navigate("/sign-up");
            return;
          } else if (res.status == 500) {
            alert(data.message);
            return;
          }
          throw new Error("updating data failed");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          handleUpdate({
            name:Name.current.value,
            email:Email.current.value,
            birthdate:Birthdate.current.value,
            gender:Gender.current.value,
            address:Address.current.value,
            number:user.number,
            image:user.image,
          });
          alert("profile updated");
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error("Error during updating profile:", err);
        alert("An error occurred during uploading data, Please try again.");
      });
  };
  if(!loginstate){
    return <Navigate to="/login" replace  state={{ from: location }}/>
  }
  return (
    <div className="container py-5 ">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6  ">
          <form
            className="card shadow-sm p-4 rounded-5"
            onSubmit={handleSubmit}
            style={{ background: "#C4A484" }}
          >
            {/* ...rest of your form fields... */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  className="form-control"
                  name="name"
                  defaultValue={user.name}
                  ref={Name}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  className="form-control"
                  name="email"
                  ref={Email}
                  defaultValue={user.email}
                  type="email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaHome />
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  ref={Address}
                  defaultValue={user.address}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaTransgender />
                </span>
                <select
                  className="form-select"
                  name="gender"
                  ref={Gender}
                  defaultValue={user.gender}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaBirthdayCake />
                </span>
                <input
                  className="form-control"
                  name="birthday"
                  type="date"
                  defaultValue={user.birthdate}
                  ref={Birthdate}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className={`${styles["Button"]}  mb-3`}>
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/profile");
                }}
                className={`${styles["Button"]}  mb-3`}
                style={{ marginLeft: "10px" }}
              >
                Update later
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailUpdate;
