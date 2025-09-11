export const getUserData = async (signal, handleuserProfile) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/userDetail", {
      signal,
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        alert(data.message);
        handleuserProfile(false);
        return;
      }
      if (response.status === 404) {
        handleuserProfile(false);
        alert(data.message);
        return;
      }
      if (response.status === 500) {
        alert(data.message);
        return;
      }
      throw new Error("Failed to fetch userProfile");
    }
    return mapServerUserToLocalUser(data.userData);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
  }
};
const mapServerUserToLocalUser = (serverUser) => {
  return {
    status:serverUser.Status,
    id:serverUser.id,
    name:serverUser.Name,
    number:serverUser.Number,
    email:serverUser.Email,
    image:serverUser.Image,
    birthdate:serverUser.Birthdate.slice(0, 10),
    gender:serverUser.Gender,
    address:serverUser.Address,
  };
};
