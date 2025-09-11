import styles from "./Profile.module.css";
import { useNavigate ,Navigate,useLocation} from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { UserStore } from "../store/UserdataStore";
import { authContext } from "../store/authStore";

const Profile = () => {
  const { user, handleUpdate } = useContext(UserStore);
  const {loginstate,handleuserProfile}=useContext(authContext);
   const location = useLocation();
  const navigate = useNavigate();
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(
    `http://localhost:3001${user.image}`
  );
  useEffect(() => {
    setPreviewImg(`http://localhost:3001${user.image}`);
  }, [user.image]);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      fetch("http://localhost:3001/updateUserProfilePic", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            if (res.status == 401) {
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
              ...user,
              image:data.image,
            })
            alert("profile image updated");
            setShowUploadPopup(false);
          }
        })
        .catch((err) => {
          console.error("Error during updating image:", err);
          alert("An error occurred during uploading. Please try again.");
        });
    } else {
      alert("please add file");
      fileInputRef.current.focus();
    }

    // You can access the file with fileInputRef.current.files[0]
    // console.log("uploaded");
    // setShowUploadPopup(false);
    // Optionally update the main profile image here if you want
    // setUser({ ...user, image: previewImg });
  };

  const handleCancel = () => {
    setShowUploadPopup(false);
    setPreviewImg(`http://localhost:3001${user.image}`); // Reset preview on cancel
  };

  // Handle file input change to preview image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if(!loginstate){
    return <Navigate to="/login" replace   state={{ from: location }}/>
  }
  return (
    <div className={`container py-5 ${styles.profileContainer}`}>
      <div className="row justify-content-center ">
        <div className="col-12 col-md-10 col-lg-8 ">
          <div
            className={`card shadow-sm p-4  rounded-5 ${styles.profileCard}`}
          >
            <div className="d-flex flex-column align-items-center">
              <img
                src={`http://localhost:3001${user.image}`}
                alt={user.name}
                className={`rounded-circle mb-3 ${styles.profileImage}`}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="mb-2">{user.name}</h3>
              <hr
                style={{
                  width: "100%",
                  borderTop: "2px solid #fff",
                  margin: "0 0 1rem 0",
                }}
              />
              <div className="w-100 mt-3">
                <div
                  style={{
                    border: "2px solid #C4A484",
                    borderRadius: "12px",
                    background: "white",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontWeight: "bold",
                      color: "#6c4f27",
                      letterSpacing: "1px",
                    }}
                  >
                    Contact Info :
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.number}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                  <p>
                    <strong>Status:</strong> {user.status?"Active":"Blocked"}
                  </p>
                </div>
                <div
                  style={{
                    border: "2px solid #C4A484",
                    borderRadius: "12px",
                    background: "white",
                    padding: "1rem",
                  }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontWeight: "bold",
                      color: "#6c4f27",
                      letterSpacing: "1px",
                    }}
                  >
                    Basic Info :
                  </p>
                  <p>
                    <strong>Birthday:</strong> {user.birthdate}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  type="button"
                  className={`${styles["Button"]} mb-3`}
                  onClick={() => {
                    navigate("/profiledetailUpdate");
                  }}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className={`${styles["Button"]} mb-3`}
                  onClick={() => setShowUploadPopup(true)}
                >
                  Change Profile Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal for Upload */}
      {showUploadPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #fffbe7 60%, #c4a484 100%)",
              borderRadius: "22px",
              padding: "2.5rem 2rem 2rem 2rem",
              minWidth: "340px",
              boxShadow: "0 8px 32px rgba(44,6,0,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "2px solid #C4A484",
              position: "relative",
              animation: "popup-fade-in 0.3s",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(44,6,0,0.10)",
                border: "1px solid #C4A484",
              }}
            >
              <img
                src={previewImg}
                alt="Profile Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <h5
              className="mb-3"
              style={{
                color: "#6c4f27",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              Upload New Profile Picture
            </h5>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="form-control mb-4"
              style={{
                maxWidth: "250px",
                background: "#fffbe7",
                border: "1.5px solid #C4A484",
                borderRadius: "8px",
                color: "#6c4f27",
                fontWeight: 500,
              }}
              onChange={handleFileChange}
            />
            <div className="d-flex gap-3 w-100 justify-content-center">
              <button
                className="btn"
                type="button"
                onClick={handleCancel}
                style={{
                  background: "#fff",
                  color: "#C4A484",
                  border: "1.5px solid #C4A484",
                  borderRadius: "8px",
                  fontWeight: 600,
                  minWidth: "100px",
                  transition: "all 0.2s",
                }}
              >
                Cancel
              </button>
              <button
                className="btn"
                type="button"
                onClick={handleUpload}
                style={{
                  background: "#C4A484",
                  color: "#fff",
                  border: "1.5px solid #C4A484",
                  borderRadius: "8px",
                  fontWeight: 600,
                  minWidth: "100px",
                  transition: "all 0.2s",
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
