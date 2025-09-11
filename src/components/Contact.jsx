import { useRef } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const name = useRef();
  const mobile = useRef();
  const email = useRef();
  const city = useRef();
  const message = useRef();

  const handlesubmit = (e)=>{
    e.preventDefault();
    // Validate form fields
    var nameRegex = /^[a-zA-Z\s]+$/;
    const isname= nameRegex.test(name.current.value);
    if (!isname) {
      alert("Please enter a valid name (letters and spaces only).");
      name.current.focus();
      return;
    }
    const contactData = {
      name: name.current.value,
      mobile: mobile.current.value,
      email: email.current.value,
      city: city.current.value,
      message: message.current.value,
    };

    fetch("http://localhost:3001/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })
      .then(async(response) => {
        const data= await response.json()
        if (!response.ok) {
          if(response.status === 422) {
            // Handle validation error
            alert(`Validation Error: ${data.message}`);
            if (data.field === "name") {
              name.current.focus();
            } else if (data.field === "mobile") {
              mobile.current.focus();
            } else if (data.field === "email") {
              email.current.focus();
            } else if (data.field === "city") {
              city.current.focus();
            } 
            return;
          }
          throw new Error( "Something went wrong");
        }
      
        return data;
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Your request has been submitted successfully.");
        // Reset form fields
        name.current.value = "";
        mobile.current.value = "";
        email.current.value = "";
        city.current.value = "";
        message.current.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your request. Please try again.");
      });
  }
  
  return (
    <>
      <div
        style={{
          backgroundImage: "url('http://localhost:3001/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "50px 0",
        }}
      >
        <center>
          <h1 style={{ margin: "50px 0px 0px 0px", color: "white" }}>
            Contact us
          </h1>
          <div
            className="modal modal-sheet position-static d-block  p-4 py-md-5"
            tabIndex="-1"
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
                {" "}
                <div className="modal-header p-5 pb-4 border-bottom-0">
                  {" "}
                  <h1 className="fw-bold mb-0 fs-2">
                    Fill out the form or Call us at +919968133855
                  </h1>{" "}
                </div>{" "}
                <div className="modal-body p-5 pt-0">
                  {" "}
                  <form  onSubmit={(e)=>handlesubmit(e)}>
                    {" "}
                    <div className="form-floating mb-3">
                      {" "}
                      <input
                        type="text"
                        ref={name}
                        className="form-control rounded-3"
                        id="name"
                        placeholder="name"
                        required
                      />{" "}
                      <label htmlFor="name">Name</label>{" "}
                    </div>{" "}
                    <div className="form-floating mb-3">
                      {" "}
                      <input
                        type="mobile"
                        maxLength="10"
                        ref={mobile}
                        className="form-control rounded-3"
                        id="mobile"
                        placeholder="Mobile"
                        required
                      />{" "}
                      <label htmlFor="mobile">Mobile</label>{" "}
                    </div>{" "}
                    <div className="form-floating mb-3">
                      {" "}
                      <input
                        type="email"
                        ref={email}
                        className="form-control rounded-3"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                      />{" "}
                      <label htmlFor="floatingInput">Email address</label>{" "}
                    </div>{" "}
                    <div className="form-floating mb-3">
                      <select
                        className="form-select rounded-3"
                        id="city"
                        ref={city}
                        defaultValue=""
                        required
                      >
                        <option value="" disabled hidden></option>{" "}
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Pune">Pune</option>
                      </select>
                      <label htmlFor="city">City</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control rounded-3"
                        ref={message}
                        maxLength={500}
                        placeholder="Write your message here"
                        id="message"
                        style={{ height: "150px" }}
                        required
                      ></textarea>
                      <label htmlFor="message">
                        Please write your message in detail.
                      </label>
                    </div>
                    <button
                      className={`${styles["login-pop-button"]} w-100 mb-2 btn btn-lg rounded-3`}
                      type="submit"
                      style={{ backgroundColor: "white", color: "#2c0600" }}
                    >
                      Register Request
                    </button>{" "}
                  </form>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </center>
      </div>
    </>
  );
};
export default Contact;
