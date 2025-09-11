import { useRef, useState, useContext } from "react";
import styles from "./ProfileDetailAdd.module.css";
import {
  FaUser,
  FaEnvelope,
  FaHome,
  FaTransgender,
  FaBirthdayCake,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../store/authStore";
import { UserStore } from "../store/UserdataStore";

const ProfileDetailAdd = () => {
  const { handleuserProfile } = useContext(authContext);
  const { user, handleUpdate } = useContext(UserStore);
  const location = useLocation();
  const name = location.state?.Name;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const Name = useRef();
  const Email = useRef();
  const Address = useRef();
  const Birthdate = useRef();
  const Gender = useRef();
  const [previewImg, setPreviewImg] = useState(
    "https://serverofchefbooking.onrender.com/defaultpic.jpg"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isName = /^[a-zA-Z\s]+$/.test(Name.current.value.trim());
    if (!isName || Name.current.value.trim() === "") {
      alert("please enter a valid name");
      Name.current.focus();
      return;
    }

    const formData = new FormData();
    formData.append("Name", Name.current.value);
    formData.append("Email", Email.current.value);
    formData.append("Address", Address.current.value);
    formData.append("Birthdate", Birthdate.current.value);
    formData.append("Gender", Gender.current.value);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    fetch("https://serverofchefbooking.onrender.com/addUserData", {
      method: "POST",
      body: formData,
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
          throw new Error("adding data failed");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          handleUpdate({
            name: Name.current.value,
            email: Email.current.value,
            birthdate: Birthdate.current.value,
            gender: Gender.current.value,
            address: Address.current.value,
            number: user.number,
            image:data.image,
          });
          alert("profile added");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error during adding data:", err);
        alert("An error occurred during uploading. Please try again.");
      });
  };

  return (
    <div className="container py-5 ">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6  ">
          <form
            className="card shadow-sm p-4 rounded-5"
            onSubmit={handleSubmit}
            style={{ background: "#C4A484" }}
          >
            <div className="d-flex flex-column align-items-center mb-3">
              <img
                src={previewImg}
                alt={name}
                className={`rounded-circle mb-3 ${styles.profileImage}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
                title="Click to change profile picture"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <small className="text-white-50" style={{ fontSize: "0.9rem" }}>
                Click image to upload new photo
              </small>
            </div>

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
                  defaultValue={name}
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
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaTransgender />
                </span>
                <select className="form-select" name="gender" ref={Gender}>
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
                  ref={Birthdate}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className={`${styles["Button"]}  mb-3`}>
                submit Profile
              </button>

              <button
                type="button"
                className={`${styles["Button"]}  mb-3 `}
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetailAdd;
